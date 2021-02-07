import { User } from "../App";

interface Props {
  user: User;
}

const Participant: React.FC<Props> = ({ user }) => {
  return (
    <div>
      <h1>Participant</h1>
      <p>{user.email}</p>
    </div>
  );
};

export default Participant;
