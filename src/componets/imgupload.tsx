import { Button } from "@mui/material"
import React from "react";
// import ImageLogo from "./image.svg";
import {ref,  uploadBytes,  getDownloadURL } from "firebase/storage"
// import "../src/imgupload.css"
// import { getStorage } from "firebase/storage";
import storage from "../firebase"

// propsに関数をもったコンポーネント
const ImageUploader:React.FC<{
  onUploadCompleted?:(url:string)=>void
}>= ({onUploadCompleted}) => {
const [url,setUrl]=React.useState<string>();
console.log("onupload",onUploadCompleted)


  const OnFileUploadFirebase =(e:any)=>{
    const file =e.target.files[0];
    const storageRef=ref(storage, file.name);
    
    uploadBytes(storageRef, file).then((snapshot:any) => {
      console.log('Uploaded a blob or file!');
    });
    getDownloadURL(ref(storage, file.name))
    .then((url:string)=>{
      // 下記でアップロードしてurlを取得できる
      console.log("url",url)
     
      if(onUploadCompleted){
        onUploadCompleted(url)
        setUrl(url)

      }
    })
  }
 
  return (
    <div className="outerBox">
    
    <div><img src={url} alt="" /></div>
      <div className="imageUplodeBox">
        <div className="imageLogoAndText">
          {/* <img src={ImageLogo} alt="imagelogo" /> */}
          <p>ここにドラッグ＆ドロップしてね</p>
        </div>
        <input className="imageUploadInput" multiple name="imageURL" type="file" accept =".png, .jpg ,.jpeg" onChange={OnFileUploadFirebase} />
      </div>
      <p>または</p>
      <Button >
        ファイルを選択
        <input className="imageUploadInput" type="file"  onChange={OnFileUploadFirebase} />
      </Button>
   
    </div>
  );
};

export default ImageUploader;
