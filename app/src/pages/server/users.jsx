

const users = (props) => {
    console.log("props",props)
  return (
    <div>
      <h5>{props.data.data.map(user=><li key={user.title}>{user.title}</li>)}</h5>
    </div>
  );
};

export const getServerSideProps= async()=>
{
    const data = await (
      await fetch("https://api.sipspheres.com/api/v1/blogs")
    ).json();
    console.log("this is serverside rendring");
    return{
        props: {
         data,
        },
    }

};
export default users;
