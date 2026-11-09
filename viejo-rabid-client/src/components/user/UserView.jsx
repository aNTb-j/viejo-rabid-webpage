import { Container, Image } from "react-bootstrap";

import NavBar from "../shared/navbar/NavBar";
import UserProfileCard from "./UserProfileCard/UserProfileCard";

import profilePic from "./profilePic.png";

const UserView = () => {
	return (
		<>
			<NavBar />

			<Container className="py-5">

				{/* Imagen de perfil */}
				<div className="d-flex justify-content-center mb-4">
					<Image
						src={profilePic}
						roundedCircle
						width={180}
						height={180}
						className="object-fit-cover"
					/>
				</div>

				{/* Tarjeta de usuario */}
				<UserProfileCard />

			</Container>
		</>
	);
};

export default UserView;