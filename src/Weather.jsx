/* eslint-disable react/prop-types */
function Weather({ data }) {

    return (
        <>
        <h3>Your Location:</h3>
        <p>{data.location.name}</p>
        <p>{data.location.region}</p>
        <p>{data.location.country}</p>
        </>
    )
}

export default Weather;