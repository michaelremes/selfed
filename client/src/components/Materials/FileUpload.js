import React, {useState } from 'react';

import axios from 'axios';
import "../../styles/Materials/CreateMaterial.css";
import {addNotification} from "../App/Notification";

const FileUpload = () => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Vybrat soubor');
  const [uploadedFile, setUploadedFile] = useState({});

  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const createMaterial = () => {
    fetch('/api/add/material', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: filename,
        type: 'file'
      }),
    }).then(res => res.json())
      .then(json => {
        if (json.success) {
          addNotification("Úspěch", "Materiál byl úspěšně nahrán.", "success");
        } else {
          addNotification("Error", "Materiál nemohl být vytvoeřn.", "danger");
          this.setState({
            createQuestionError: json.message,
          });
        }
      });
  };

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('/api/upload/material', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });
      createMaterial();
    } catch (err) {
      if (err.response.status === 500) {
       console.log('There was a problem with the server');
      } else {
       console.log(err.response.data.msg);
      }
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className='file-upload'>

          <input
            type='file'
            id='file-upload'
            onChange={onChange}
          />
          <label htmlFor="file-upload" className="custom-file-upload">
            {filename}
          </label>
        </div>

        <button
          type='submit'
        >
        Nahrát soubor
      </button>
      </form>
    </div>
  );
};

export default FileUpload;
