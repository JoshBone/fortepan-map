import style from "./GalleryItem.module.scss"

const GalleryItem = ({photoData, selectedPhoto, onSelect}) => {
    const url = `https://fortepan.download/file/fortepan-eu/480/fortepan_${photoData['id']}.jpg`

    return (
        <div className={selectedPhoto === photoData['id'] ? `${style.GalleryItem} ${style.Selected}` : style.GalleryItem}
             onClick={() => onSelect(photoData)}>
            <img src={url}
                 alt={`Fortepan photo no. ${photoData['id']}`}
                 height={130}
            />
        </div>
    )
}

export default GalleryItem;