import { Button } from "@mui/material"
// import ImageLogo from "./image.svg";
// import "../../src/imageUpload.css"
import storage from "./firebase";
import {ref,  uploadBytes,  getDownloadURL } from "firebase/storage"
import { getStorage } from "firebase/storage";
const ImageUploader = () => {
  const storage = getStorage();
  const OnFileUploadFirebase =(e:any)=>{
    const file =e.target.files[0];
    const storageRef=ref(storage,"/image/" + file.name);
    
    uploadBytes(storageRef, file).then((snapshot:any) => {
      console.log('Uploaded a blob or file!');
    });
  
    getDownloadURL(ref(storage,"/image/" + file.name))
    .then((url:any)=>{
      // 下記でアップロードしてurlを取得できる
      console.log("url",url)
    })
    console.log("URL",getDownloadURL)

  }
 


  return (
    <div className="outerBox">
      <div className="title">
        <h2>画像アップローダー</h2>
        <p>JpegかPngの画像ファイル</p>
      </div>
      <div className="imageUplodeBox">
        <div className="imageLogoAndText">
          {/* <img src={ImageLogo} alt="imagelogo" /> */}
          <p>ここにドラッグ＆ドロップしてね</p>
        </div>
        <input className="imageUploadInput" multiple name="imageURL" type="file" accept =".png, .jpg ,.jpeg" onChange={OnFileUploadFirebase} />
      </div>
      <p>または</p>
      <Button variant="contained">
        ファイルを選択
        <input className="imageUploadInput" type="file"  onChange={OnFileUploadFirebase} />
      </Button>
      <div id="myimg"></div>
    </div>
  );
};

export default ImageUploader;
