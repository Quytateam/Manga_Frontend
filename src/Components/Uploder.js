import React, { useCallback, useState } from "react";
import { uploadImage } from "../Redux/APIs/ImageUploadService";
import { useDropzone } from "react-dropzone";
import { InlineError } from "./Notfications/Error";

function Uploder({ setImage, mangaName, chapName, isImage, setIsHeight }) {
  const [loading, setLoading] = useState(false);

  // upload file
  const onDrop = useCallback(
    async (acceptedFiles) => {
      const formData = new FormData();
      formData.append("file", acceptedFiles[0]);
      formData.append("mangaName", mangaName);
      if (chapName !== undefined) formData.append("chapName", chapName);
      const data = await uploadImage(formData, setLoading);
      setImage(data?.url);
      setIsHeight(data?.height);
    },
    [setImage, mangaName, chapName, setIsHeight]
  );

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop,
  });
  return (
    <>
      <div className="form-group pb-16">
        <div className="col-sm-2 text-end mt-2 pr-0">
          <label
            htmlFor="ctl00_mainContent_txtMangaName"
            className="control-label"
          >
            Bìa truyện <span>(*)</span>
          </label>
        </div>
        <div className="col-sm-10">
          <span
            {...getRootProps()}
            className="custom-fileinput-button"
            style={{ pointerEvents: mangaName === "" ? "none" : "auto" }}
          >
            <i className="fa fa-plus"></i>
            <span>Upload bìa truyện</span>
            {loading ? (
              <></>
            ) : (
              <input
                id="fileUploader"
                type="file"
                name="mangaThumbnailFileupload"
                accept="image/*"
                {...getInputProps()}
                style={{ display: "none" }}
              />
            )}
            {/* <span className="avatar-note mt-4 block">
              {isDragActive ? (
                "Drop it like it's hot!"
              ) : isDragReject ? (
                "Unsupported file type..."
              ) : (
                <></>
              )}
            </span> */}
          </span>
          {isImage && <InlineError text={"Thêm ảnh bìa của manga"} />}

          {/* <div
            id="progress"
            className="progress"
            style={{ marginTop: "10px", display: "none" }}
          >
            <div className="progress-bar progress-bar-success"></div>
          </div>
          <div>
            <input
              className="include-valid"
              data-val="true"
              data-val-required="&#39;Bìa truyện&#39; là trường thông tin bắt buộc"
              id="ThumbnailUrl"
              name="ThumbnailUrl"
              type="hidden"
              value=""
            />
            <span
              className="field-validation-valid"
              data-valmsg-for="ThumbnailUrl"
              data-valmsg-replace="true"
            ></span>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default Uploder;
