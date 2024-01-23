import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import style from "./MapComponent.module.scss";
import {useEffect, useState} from "react";

const MapComponent = ({photoData}) => {
    const [position, setPosition] = useState([47.4983, 19.0408])

    console.log(photoData);

    const renderMarkers = () => {
        const {places} = photoData;
        if (places) {
            return places.map((p, idx) => {
                if (p['latitude'] && p['longitude']) {
                    return (
                        <Marker key={idx} position={[p['latitude'], p['longitude']]}>
                            <Popup>
                                {p['full_address']}
                            </Popup>
                        </Marker>
                    )
                }
            })
        }
    }

    return (
        <div className={style.MapWrapper}>
            <MapContainer className={style.MapContainer} center={position} zoom={14} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {photoData && renderMarkers()}
            </MapContainer>
        </div>
    )
}

export default MapComponent;