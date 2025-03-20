import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";

type CSVFileImportProps = {
  url: string;
  title: string;
};

export default function CSVFileImport({ url, title }: CSVFileImportProps) {
  const [file, setFile] = React.useState<File>();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setFile(file);
    }
  };

  const removeFile = () => {
    setFile(undefined);
  };

  const uploadFile = async () => {
    if (!file) return;

    console.log("uploadFile to", url);

    try {
      // Get the presigned URL for the file upload
      const response = await axios.get(url, {
        params: {
          name: encodeURIComponent(file.name),
        },
      });

      console.log("File to upload: ", file.name);
      console.log("Uploading to: ", response.data);

      // Upload the file using the presigned URL
      const result = await fetch(response.data, {
        method: "PUT",
        body: file,
      });

      if (result.ok) {
        console.log("File uploaded successfully!");
      } else {
        console.error("Error uploading file:", result.statusText);
      }
    } catch (error) {
      console.error("Error fetching presigned URL:", error);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {!file ? (
        <input type="file" onChange={onFileChange} />
      ) : (
        <div>
          <button onClick={removeFile}>Remove file</button>
          <button onClick={uploadFile}>Upload file</button>
        </div>
      )}
    </Box>
  );
}
