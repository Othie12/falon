import { useState } from "react";
import axios from 'axios';

const UploadBeatForm = () => {
    const [name, setName] = useState('');
    const [genre, setGenre] = useState('');
    const [bpm, setBpm] = useState('');
    const [duration, setDuration] = useState('');
    const [artwork, setArtwork] = useState(null);
    const [price, setPrice] = useState('');
    const [desc, setDesc] = useState('')
    const [file, setFile] = useState(null);

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleGenreChange = (e) => {
        setGenre(e.target.value);
    };

    const handleBpmChange = (e) => {
        setBpm(e.target.value);
    };

    const handleArtworkChange = (e) => {
        setArtwork(e.target.value);
    }

    const handlePricechange = (e) => {
        setPrice(e.target.value);
    }

    const handleDescChange = (e) => {
        setDesc(e.target.value);
    }

    const handleDurationChange = (e) => {
        setDuration(e.target.value);
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('genre', genre);
        formData.append('bpm', bpm);
        formData.append('desc', desc);
        formData.append('artwork', artwork);
        formData.append('price', price);
        formData.append('duration', duration);
        formData.append('file', file);

        try {
            await axios.post('http://localhost:8080/Upload_beat', formData, {
                headers: {
                    'content-Type': 'multipart/form-data',
                },
            });
            alert('Beat uploaded successfuly');
            setName('')
            setGenre('')
            setBpm('')
            setDuration('')
            setArtwork(null)
            setDesc('')
            setPrice('')
            setFile(null)
        } catch (error) {
            console.error(error);
            alert('Error uploading beat');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
                <h1 align="center">Upload beat</h1>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Beat Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={handleNameChange}
                    placeholder="XXX beat pro mastered"
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="genre" className="form-label">Genre</label>
                <input
                    type="text"
                    className="form-control"
                    id="genre"
                    value={genre}
                    onChange={handleGenreChange}
                    placeholder="pop, soul, rnb, ragga"
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="bpm" className="form-label">Bpm</label>
                <input
                    type="number"
                    className="form-control"
                    id="bpm"
                    value={bpm}
                    onChange={handleBpmChange}
                    placeholder="129"
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="duration" className="form-label">Duration</label>
                <input
                    type="text"
                    className="form-control"
                    id="duration"
                    value={duration}
                    onChange={handleDurationChange}
                    placeholder="02:34"
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="desc" className="form-label">Description</label>
                <input
                    type="textarea"
                    className="form-control"
                    id="desc"
                    value={desc}
                    onChange={handleDescChange}
                    placeholder="Say anything about your beat"
                />
            </div>
            <div className="mb-3">
                <label htmlFor="price" className="form-label">Price(USD)</label>
                <input
                    type="text"
                    className="form-control"
                    id="price"
                    value={price}
                    onChange={handlePricechange}
                    placeholder="23.33 NB: only US dollars"
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="artwork" className="form-label">Artwork</label>
                <input
                    type="file"
                    className="form-control"
                    id="artwork"
                    onChange={handleArtworkChange}
                    accept="image/*"
                />
            </div>
            <div className="mb-3">
                <label htmlFor="file" className="form-label">Beat Audio File</label>
                <input
                    type="file"
                    className="form-control"
                    id="file"
                    onChange={handleFileChange}
                    accept="audio/*"
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary">Upload</button>
        </form>
    );
};

export default UploadBeatForm;