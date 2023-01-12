import React, { useState, useEffect, useRef } from "react";


//create your first component
const Home = () => {

	
	const [listaSongs, setListaSongs] = useState([]); //listaSongs es mi array donde tengo cada cancion
	let startSong = useRef(null);
	console.log(startSong);
	
	let [positionSong, setPositionSong] = useState(0);
	let [songName, setSongName] = useState("");

	function getSongs() {
		fetch("https://assets.breatheco.de/apis/sound/songs")
			.then((response) => {
				console.log(response.status);
				return response.json()
			}) //promesa 1
			.then((data) => {
				console.log(data);
				return setListaSongs(data) // asi completo mi array listaSongs con lo que fetcheie
			})
			.catch((err) => console.log(err))

	}

	//funcion para reproducir canciones
	function reproducir(url, id){

		if(startSong.current.paused){
			console.log("estoy en el if");
			startSong.current.src = `https://assets.breatheco.de/apis/sound/${url}`;
			startSong.current.play();
		}else{
			startSong.current.pause();
			console.log("Esta en play");

		}
				
		setPositionSong(id-1);
		getSongName();
				
	}

	//funcion para obtener el valor del nombre de la cancion que se este reproduciendo
	function getSongName() {
		let filteredSong = listaSongs.filter(item => item.id === positionSong+1);	
		let filteredSongObject = filteredSong[0];
		// console.log(filteredSongObject.name);
		setSongName(filteredSongObject.name);

	}
	
	function forward(){
		setPositionSong(positionSong+1);
		startSong.current.src = `https://assets.breatheco.de/apis/sound/${listaSongs[positionSong].url}`;
		console.log(startSong.current.src);
		startSong.current.play();
		getSongName();
	}

	function backward(){
		setPositionSong(positionSong-1)
		startSong.current.src = `https://assets.breatheco.de/apis/sound/${listaSongs[positionSong].url}`;
		console.log(startSong.current.src);
		startSong.current.play();
		getSongName();
	}
		
	useEffect(() => {
		getSongs();
				
	}, [])
	


	return (
		<div className="container bg-dark vh-100 vw-100">
			<h1 className="text-white text-center">Choose your song</h1>
			<div className="row" style={{
    height: '500px',
    width: '100%',
    overflow: 'auto',
	marginTop: '80px'
  }}>
	
				
					{listaSongs.map((item, index) => <button className="btn btn-dark text-start" type="button" key={index} onClick={()=> reproducir(item.url, item.id)}>{item.id} ---- {item.name}</button>)}
				
			</div>

			<div className="container d-flex justify-content-center bg-dark">
			<button type="button" className="btn btn-info btn-lg" onClick={() => backward(positionSong)}><i className="fa fa-backward"></i></button><audio ref={startSong} id="reproductor" controls>				
					<source src={startSong} type="audio/mpeg" />
					Your browser does not support the audio tag.
				</audio><button type="button" className="btn btn-info btn-lg" onClick={() => forward(positionSong)}><i className="fa fa-forward"></i></button>
			</div>
			<h2 className="text-white text-center">{songName}</h2>
			
		</div>
	);
};

// onClick={() => cancionReproducir(item.id)}
export default Home;
