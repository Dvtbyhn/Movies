import Spinner from 'react-bootstrap/Spinner';

function Loading() {
  return (
    <div style={{ color: "white", textAlign: "center", marginTop: "10rem" }}>

      <Spinner size='xl' animation="border" role="status"></Spinner>


    </div>
  );
}

export default Loading;