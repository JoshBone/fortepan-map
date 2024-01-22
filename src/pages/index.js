import Head from "next/head";
import {Nunito_Sans} from "next/font/google";
import {Col, Container, Row} from "react-bootstrap";
import style from "./index.module.scss";
const nunitoSans = Nunito_Sans({ subsets: ["latin"] , weight: ['400', '800', '1000']});
import Image from 'next/image';

import { promises as fs } from 'fs';
import {useState} from "react";
import GalleryItem from "@/components/GalleryItem";
import dynamic from "next/dynamic";

export async function getStaticProps() {
    const file = await fs.readFile(process.cwd() + '/src/data/FortepanVkerGeoTagged.json', 'utf8');
    const data = JSON.parse(file);

    return { props: {data} }
}

const MapComponent = dynamic(
    () => import('../components/MapComponent'),
    { ssr: false }
);

export default function Home({data}) {
  const [selectedPhoto, setSelectedPhoto] = useState(undefined)
  const [selectedPhotoData, setSelectedPhotoData] = useState({})

  const handleSelect = (photoData) => {
      setSelectedPhoto(photoData['id'])
      setSelectedPhotoData(photoData)
  }

  const renderPhotos = () => {
      return data.map((photo, idx) => {
          return <GalleryItem key={idx} photoData={photo} selectedPhoto={selectedPhoto} onSelect={handleSelect}/>
      })
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${nunitoSans.className}`}>
          <Container fluid>
              <Row>
                  <Col>
                      <div className={style.Header}>
                          <svg className="header-nav__logo" xmlns="http://www.w3.org/2000/svg" width="64" height="40"
                               viewBox="0 0 64 40">
                              <path fill="#F73F13"
                                    d="M33.4766766,0 C34.2169647,0.20303757 34.9824083,0.34332534 35.6943467,0.621103118 C38.1260375,1.56954436 40.5441524,2.55555556 42.9578751,3.54756195 C46.7599375,5.11031175 50.5612014,6.67266187 54.3496879,8.26698641 C56.6619903,9.24020783 58.838134,10.4560352 60.7315786,12.1306954 C62.9093195,14.0567546 63.9335046,16.4980016 63.9945963,19.3808953 C64.0289354,20.988809 63.909547,22.5711431 63.3481419,24.0939249 C62.5459634,26.2717826 61.1891677,27.9820144 59.1955007,29.2094325 C57.2577346,30.402478 55.1666402,31.2521982 53.0807366,32.1235012 C47.4303495,34.4840128 41.7871497,36.8633094 36.1243846,39.1958433 C35.2675031,39.5483613 34.3223779,39.6870504 33.4187792,39.9260592 C33.3433129,39.9464428 33.2690445,39.9748201 33.1947761,40 L31.7852739,40 C31.744546,39.9792166 31.7066133,39.9516387 31.6642883,39.940048 C30.9335831,39.7342126 30.1757261,39.5971223 29.4753672,39.3165468 C23.2779496,36.8393285 17.095705,34.323741 10.8974888,31.8473221 C8.7716559,30.9976019 6.69174168,30.0835332 4.76435717,28.8221423 C2.43967669,27.3001599 0.913581059,25.254996 0.325423323,22.5291767 C0.202441257,21.9592326 0.107409661,21.3844924 0,20.8113509 L0,18.695044 C0.0726712206,18.3053557 0.134960838,17.9136691 0.219610831,17.5267786 C0.825736726,14.754996 2.16456421,12.4732214 4.58906779,10.891287 C6.00895164,9.96522782 7.48833006,9.1598721 9.06313937,8.53956835 C14.5098873,6.39328537 19.9598295,4.254996 25.4133654,2.12509992 C26.9390618,1.52917666 28.4735425,0.951239009 30.0188042,0.407673861 C30.5854001,0.207833733 31.1951197,0.132294165 31.7856732,0 C32.3490748,0 32.9128757,0 33.4766766,0 Z"></path>
                              <path fill="#FFF"
                                    d="M25.7828547,29.4890933 C25.7751278,29.636203 25.7657742,29.7499148 25.7653675,29.8636266 C25.7641475,30.7526462 25.7641475,31.6412681 25.7645542,32.5298901 C25.7649609,32.9938819 25.769841,32.9994482 26.2485007,32.9994482 C28.7125613,33 31.1766218,33 33.6406823,33 C33.7004639,33 33.7606523,32.9982555 33.8204339,32.9990506 C34.0245861,33.0038218 34.1225955,32.9231102 34.1213754,32.7076145 C34.1140552,31.7251604 34.1152753,30.7431039 34.119342,29.7606498 C34.1201554,29.5670217 34.0371931,29.4859126 33.8407678,29.4882981 C33.5296593,29.4938644 33.2189575,29.4946596 32.907849,29.4879005 C32.2404908,29.4731896 31.808599,29.1252951 31.673582,28.4855668 C31.6329142,28.2919386 31.6093269,28.091949 31.6085136,27.8947425 C31.6040401,26.0125339 31.6109536,24.1291324 31.6011934,22.2465262 C31.5995667,21.9467405 31.6922892,21.8334263 32.0103112,21.8354143 C33.0505929,21.8413782 34.0904679,21.8107635 35.1307496,21.8175226 C35.4125773,21.8195106 35.7045719,21.8704025 35.9737926,21.9542948 C36.4927134,22.1153203 36.6960523,22.4178891 36.7001191,22.9494719 C36.7029658,23.4178373 36.7005258,23.8854075 36.7017458,24.3525801 C36.7025592,24.5553529 36.7660009,24.6797997 37.0140743,24.6770166 C37.8990051,24.6674743 38.7843426,24.6690647 39.6692734,24.6758238 C39.9051465,24.6782094 39.9950223,24.574835 39.985262,24.358544 C39.9836353,24.3239534 39.985262,24.2889651 39.985262,24.2535793 C39.985262,21.5757856 39.9836353,18.8971967 39.9881088,16.2190055 C39.9885154,15.9693166 39.9620814,15.7717125 39.6395859,15.7721101 C38.7542484,15.7740981 37.868911,15.7740981 36.9839802,15.7721101 C36.7257398,15.7717125 36.6204102,15.8953642 36.6277304,16.1422699 C36.635864,16.4229711 36.6309839,16.7036722 36.6285438,16.9843734 C36.6212236,17.8113683 36.160051,18.2693963 35.3206681,18.272577 C34.2445988,18.276553 33.1677161,18.26383 32.0916467,18.2797337 C31.759391,18.2845048 31.6577216,18.1719858 31.6589416,17.8523205 C31.6691085,15.5486625 31.6691085,13.2446069 31.6589416,10.9409489 C31.6577216,10.6248619 31.7545109,10.5016079 32.0879866,10.5055838 C33.0087051,10.5167164 33.9298302,10.4876921 34.8505486,10.5035958 C35.5728083,10.5159212 36.2462667,10.8491048 36.1856717,11.7906067 C36.1482574,12.3726839 36.1905519,12.9595322 36.1738781,13.543995 C36.1653378,13.8441782 36.2678206,13.959878 36.586656,13.9547093 C37.5667494,13.9396007 38.5480628,13.9356248 39.5285629,13.9566972 C39.8835926,13.9642515 40.0027492,13.870817 40,13.5066212 C39.9824153,11.5186526 39.9913622,9.530684 39.9913622,7.54271542 C39.9913622,7.00039759 39.9913622,7 39.4407205,7 C34.8233012,7 30.205882,7 25.5884627,7 C25.4924868,7 25.3973242,7.00119278 25.3013482,7.00119278 C25.0943492,7.00198797 25,7.10178399 25,7.30614716 C25.0032534,8.27707101 25.0024401,9.24719968 25.00122,10.2181235 C25.0008134,10.426065 25.1004494,10.5071742 25.3131419,10.5000175 C25.6470243,10.4888849 25.9825335,10.5020054 26.3176359,10.493656 C27.2643818,10.4709931 27.8203102,10.8912497 27.9158795,11.8144623 C27.9903016,12.532119 27.9752545,13.260113 27.9744411,13.9837336 C27.968341,18.637568 27.9553273,23.2914025 27.9435336,27.9448393 C27.9431269,28.0967201 27.9398735,28.2505889 27.9162862,28.3996865 C27.7995697,29.1252951 27.3656445,29.4875029 26.6222376,29.4886957 C26.3489501,29.4894909 26.0772894,29.4890933 25.7828547,29.4890933 Z"></path>
                          </svg>
                          <span style={{fontWeight: 1000, color: '#333', paddingLeft: '10px'}}>FORTEPAN MAP</span>
                      </div>
                  </Col>
              </Row>
              <Row style={{minHeight: '100wh'}}>
                  <Col xs={4}>
                      <div className={style.PhotoGrid}>
                          {renderPhotos()}
                      </div>
                  </Col>
                  <Col xs={8}>
                      <div className={style.RightSide}>
                          <MapComponent photoData={selectedPhotoData} />
                      </div>
                  </Col>
              </Row>
          </Container>
      </main>
    </>
  );
}
