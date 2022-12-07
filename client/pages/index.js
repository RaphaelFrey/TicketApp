import axios from "axios";

const LandingPage = ({currentUser}) => {
    //console.log(currentUser);
    //axios.get('/api/users/currentuser').catch((err) => {
      //  console.log(err.message);
    //});
    return <h1>Landing Page</h1>;
};

LandingPage.getInitialProps = async ({ req }) => {

    if (typeof window === 'undefined') {
        //we are on the server!
        //there is no window in the server.
        //request should be made to ingress-nginx
        const { data } = await axios.get(
            'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser', {
                headers: req.headers
            }
        );
    }
    else {
        //we are on the browser
        //requests can be made with a base url of ''
        const { data } = await axios.get('/api/users/currentuser');
        // { currentUser: null } if signed-out
        return data;
    }
    return [{}];
};
export default LandingPage;