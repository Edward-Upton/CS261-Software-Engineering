import axios from "axios";
import { useState } from "react";
import "./Invite.css";
import MyButton from "./MyButton";
import MyTextField from "./MyTextField";

interface Props {
  participants: { id: string; email: string }[];
  addParticipant: (id: string, email: string) => void;
}

// Component to show invited users on the create event panel
// in the host tab. Shows each user's email and handles ensuring
// that the email entered is present as an account.
const Invite: React.FC<Props> = (props) => {
  // Storing the current typed email
  const [inviteEmail, setInviteEmail] = useState<string>("");

  // Requests the user with the corresponding email
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
      {/* List of invited users */}
      {props.participants.map(({ id, email }, i) => {
        return (
          <div key={id} className="invite__userInvited">
            {email}
          </div>
        );
      })}

      {/* Invite User Input with Button */}
      <div className="invite__email">
        <input
          type="email"
          placeholder="@ Enter User's Email"
          value={inviteEmail}
          onChange={(v) => setInviteEmail(v.target.value)}
          className="invite__email__input"
        ></input>
        <MyButton
          fontSize="1rem"
          onClick={inviteParticipant}
          styled={{
            borderRadius: "1rem",
            width: "6rem",
            height: "1.8rem",
            backgroundColor: "#EE862F",
          }}
        >
          Invite
        </MyButton>
      </div>
    </div>
  );
};

export default Invite;
