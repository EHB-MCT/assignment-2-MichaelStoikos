import {Link} from "react-router-dom"

const homePage = () => {

    return (
        <>
            <h1>Welcome to my website</h1>
            <Link to="/Skills">Skills Page</Link>
        </>
    );
}

export default homePage