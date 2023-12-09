//interface BusinessCardPropsType {
type BusinessCardPropsType = {
    name: String;
    position: String;
    adress: String;
    experience: number
}

//function BusinessCard(props: BusinessCardPropsType) {
function BusinessCard({name, position, adress, experience}: BusinessCardPropsType) {
  return (
    <div>
        <h2>{name}</h2>
        <h3>{position}</h3>
        <div>{adress}</div>
        <div>Experience: {experience}</div>
    </div>
  )
}

export default BusinessCard