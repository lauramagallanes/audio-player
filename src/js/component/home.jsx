import React, { useState, useEffect, useRef } from "react";


//create your first component
const Home = () => {

	// const [song, setSong] = useState(null);
	const [listaSongs, setListaSongs] = useState([]); //listaSongs es mi array donde tengo cada cancion
	let startSong = useRef(null);
	console.log(startSong);
	// let i=0;
	let [positionSong, setPositionSong] = useState(0);

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
// let startSong = ""
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
		
						
	}

	function forward(){
		setPositionSong(positionSong++);
		startSong.current.src = `https://assets.breatheco.de/apis/sound/${listaSongs[positionSong].url}`;
		console.log(startSong.current.src);
		startSong.current.play()
	}

	function backward(){
		setPositionSong(positionSong--)
		startSong.current.src = `https://assets.breatheco.de/apis/sound/${listaSongs[positionSong].url}`;
		console.log(startSong.current.src);
		startSong.current.play()
	}
		
	useEffect(() => {
		getSongs();
				
	}, [])


	return (
		<div className="container bg-dark">
			<div className="row">
				
					{listaSongs.map((item) => <button className="btn btn-dark text-start" type="button" key={item.id} onClick={()=> reproducir(item.url, item.id)}>{item.id} ---- {item.name}</button>)}
				
			</div>

			<div className="container d-flex justify-content-center bg-dark">
			<button type="button" className="btn btn-info btn-lg" onClick={() => backward(positionSong)}><i className="fa fa-backward"></i></button><audio ref={startSong} id="reproductor" controls>				
					<source src={startSong} type="audio/mpeg" />
					Your browser does not support the audio tag.
				</audio><button type="button" className="btn btn-info btn-lg" onClick={() => forward(positionSong)}><i className="fa fa-forward"></i></button>
			</div>
			
		</div>
	);
};

// onClick={() => cancionReproducir(item.id)}
export default Home;
