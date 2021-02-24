import axios from "axios";
import { useState } from "react";
import "./Invite.css";
import MyButton from "./MyButton";
import MyTextField from "./MyTextField";

interface Props {
  participants: { id: string; email: string }[];
  addParticipant: (id: string, email: string) => void;
}
const Invite: React.FC<Props> = (props) => {
  const [inviteEmail, setInviteEmail] = useState<string>("");

  const inviteParticipant = async () => {
    try {
      const res = await axios.get("/api/user/userId/" + inviteEmail);
      const { userId } = res.data;
      props.addParticipant(userId, inviteEmail);
      setInviteEmail("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="invite">
      <div className="invite__title">Invite Participants</div>
      <div className="invite__invite">
        <MyTextField
          type="text"
          placeholder="Email..."
          onChange={(v) => setInviteEmail(v)}
          value={inviteEmail}
          styled={{ width: "50%" }}
        />
        <MyButton
          text="Invite"
          onClick={inviteParticipant}
          styled={{ width: "40%", backgroundColor: "#59c9a5" }}
        />
      </div>
      {props.participants.map(({ id, email }, i) => {
        return <div key={id}>{email}</div>;
      })}
    </div>
  );
};

export default Invite;
