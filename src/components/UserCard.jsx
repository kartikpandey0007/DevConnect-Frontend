const UserCard = ({user}) => {
    const {firstName, lastName, photoUrl, age, about, gender, skills} = user
  return (
    <div>
      <div className="card bg-base-300 w-96 shadow-sm my-10">
        <figure>
          <img
         className="w-full h-80 object-cover"  
            src={photoUrl}
            alt="Photo"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {age && gender && <p>{age + ", " +gender}</p>}
          <p>
           {about}
          </p>
          <div className="card-actions justify-center">
            <button className="btn btn-secondary">Send Request</button>
            <button className="btn btn-primary">Ignore Profile</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
