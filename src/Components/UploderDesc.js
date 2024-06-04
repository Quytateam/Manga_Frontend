import React, { useCallback, useState } from "react";
import { uploadImage } from "../Redux/APIs/ImageUploadService";
import { useDropzone } from "react-dropzone";

function UploderDesc({ values, setValue, mangaName, chapName }) {
  const [loading, setLoading] = useState(false);

  // upload file
  const onDrop = useCallback(
    async (acceptedFiles) => {
      const formData = new FormData();
      formData.append("file", acceptedFiles[0]);
      formData.append("mangaName", mangaName);
      formData.append("chapName", chapName);
      const data = await uploadImage(formData, setLoading);
      const imgTag = `<img src='${data?.url}' />`;
      setValue("desc", values?.desc + imgTag);
    },
    [values, setValue, mangaName, chapName]
  );

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop,
  });
  return (
    <>
      <div className="form-group pb-16">
        <div className="col-sm-2 text-end mt-2 pr-0"></div>
        <div className="col-sm-10">
          <span
            {...getRootProps()}
            className="custom-fileinput-button"
            style={{ pointerEvents: chapName === "" ? "none" : "auto" }}
          >
            <i className="fa fa-plus"></i>
            <span>Chọn ảnh</span>
            {/* <input
              id="mangaThumbnailFileupload"
              type="file"
              name="mangaThumbnailFileupload"
              accept="image/*"
            /> */}
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
          </span>
        </div>
      </div>
    </>
  );
}

export default UploderDesc;
