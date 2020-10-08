import React, { Component } from "react";
import axios from "axios";

export default class App extends Component {
  state = {
    selectedFile: null,
    loaded: 0,
    message: "",
    uploading: false,
  };
  handleFileChange = (e) => {
    this.setState({ selectedFile: e.target.files[0] });
  };
  handleUpload = (event) => {
    event.preventDefault();
    if (this.state.uploading) return;
    if (!this.state.selectedFile) {
      this.setState({ message: "Select a file first" });
      return;
    }
    this.setState({ uploading: true });
    const data = new FormData();
    data.append("file", this.state.selectedFile, this.state.selectedFile.name);
    axios
      .post("http://localhost:4040/upload", data, {
        onUploadProgress: (ProgressEvent) => {
          this.setState({
            loaded:
              Math.round(ProgressEvent.loaded / ProgressEvent.total) * 100,
          });
        },
      })
      .then((res) => {
        console.log(res.statusText);
        this.setState({ message: "File successfully uploaded" });
        this.setState({ uploading: false });
      })
      .catch((err) => {
        this.setState({
          uploading: false,
          message: "Failed to upload",
        });
      });
  };
  render() {
    return (
      <form className="box" onSubmit={this.handleUpload}>
        <input
          type="file"
          name="file-5[]"
          id="file-5"
          className="inputfile inputfile-4"
          onChange={this.handleFileChange}
        />
        <label htmlFor="file-5">
          <figure>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="17"
              viewBox="0 0 20 17"
            >
              <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" />
            </svg>
          </figure>
          <span>
            {this.state.uploading
              ? this.state.loaded + "%"
              : this.state.message}
          </span>
        </label>
        {!this.state.uploading ? (
          <button className="submit" onClick={this.handleUpload}>
            Upload
          </button>
        ) : (
          <button className="submit">Uploading</button>
        )}
      </form>
    );
  }
}

// import React, { Component } from "react";
// import "./App.css";
// import Axios from "axios";

// export default class App extends Component {
// 	state = {
// 		selectedFile: null,
// 		loaded: 0
// 	};
// 	onChangeHandler = e => {
// 		this.setState({ selectedFile: e.target.files[0] });
// 		console.log(this.state.selectedFile);
// 	};
// 	onClickHandler = () => {
// 		const data = new FormData();
// 		data.append("file", this.state.selectedFile);
// 		Axios.post("http://localhost:8000/upload", data, {
// 			// receive two parameter endpoint url ,form data
// 		}).then(res => {
// 			// then print response status
// 			console.log(res.statusText);
// 		});
// 	};

// 	render() {
// 		return (
// 			<div className="container">
// 				<div className="row">
// 					<div className="col-md-6">
// 						<form method="post" action="#" id="#">
// 							<div className="form-group files color">
// 								<label>Upload Your File </label>
// 								<input
// 									type="file"
// 									name="file"
// 									className="form-control"
// 									onChange={this.onChangeHandler}
// 								/>
// 							</div>
// 							<button
// 								type="button"
// 								className="btn btn-success btn-block"
// 								onClick={this.onClickHandler}
// 							>
// 								Upload
// 							</button>
// 						</form>
// 					</div>
// 				</div>
// 			</div>
// 		);
// 	}
// }

//SINGLE FILE UPLOAD USING CLOUDINGARY
// import React, { useState } from "react";

// export default function App() {
// 	const [imageUrl, setImageUrl] = useState();
// 	const [image, setImage] = useState(null);
// 	const [loading, setLoading] = useState(false);

// 	const onClickFile = e => {
// 		setImage(e.target.files[0]);
// 	};
// 	const onFileUpload = async e => {
// 		console.log(image);
// 		const data = new FormData();
// 		data.append("file", image);
// 		data.append("upload_preset", "optimal");
// 		setLoading(true);
// 		const res = await fetch(
// 			"https://api.cloudinary.com/v1_1/runsboy/image/upload",
// 			{
// 				method: "POST",
// 				body: data
// 			}
// 		);
// 		console.log(res);
// 		const file = await res.json();
// 		console.log(file);

// 		setImageUrl(file.secure_url);

// 		setLoading(false);
// 	};

// 	return (
// 		<div>
// 			<h1>Upload files</h1>
// 			<div>
// 				<input type="file" name="file" onChange={onClickFile} />
// 				{loading ? (
// 					<h3>Loading....</h3>
// 				) : (
// 					<img src={imageUrl} alt="Upload PNG/JPG/JPEG" />
// 				)}
// 			</div>
// 			<div>
// 				<input
// 					type="submit"
// 					name="submit"
// 					onClick={onFileUpload}
// 					value="Submit"
// 				/>
// 			</div>
// 		</div>
// 	);
// }

//FOR MULTIPLE FILES
// import React, { useState } from "react";

// export default function App() {
// 	const [imageUrl, setImageUrl] = useState();
// 	const [image, setImage] = useState(null);
// 	const [loading, setLoading] = useState(false);

// 	const onClickFile = e => {
// 		setImage(e.target.files);
// 	};
// 	const onFileUpload = async e => {
// 		console.log(image);
// 		const data = new FormData();
//		for(i = 0; i < image.length; i++){
// 		data.append("file", image[i]);
//		}

// 		data.append("upload_preset", "optimal");
// 		setLoading(true);
// 		const res = await fetch(
// 			"https://api.cloudinary.com/v1_1/runsboy/image/upload",
// 			{
// 				method: "POST",
// 				body: data
// 			}
// 		);
// 		console.log(res);
// 		const file = await res.json();
// 		console.log(file);

// 		setImageUrl(file.secure_url);

// 		setLoading(false);
// 	};

// 	return (
// 		<div>
// 			<h1>Upload files</h1>
// 			<div>
// 				<input type="file" name="file" multiple onChange={onClickFile} />
// 				{loading ? (
// 					<h3>Loading....</h3>
// 				) : (
// 						<img src={imageUrl} alt="Upload PNG/JPG/JPEG" />
// 					)}
// 			</div>
// 			<div>
// 				<input
// 					type="submit"
// 					name="submit"
// 					onClick={onFileUpload}
// 					value="Submit"
// 				/>
// 			</div>
// 		</div>
// 	);
// }
