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
    <div id="invite">
      <div id="invite__title">Invited Participants</div>
      <div id="invite__invite">
        {/* Email input */}
        <MyTextField
          type="text"
          placeholder="Email..."
          onChange={(v) => setInviteEmail(v)}
          value={inviteEmail}
          styled={{ width: "50%" }}
        />

        {/* Invite button */}
        <MyButton
          onClick={inviteParticipant}
          styled={{ width: "40%", backgroundColor: "#59c9a5" }}
        >
          Invite
        </MyButton>
      </div>

      {/* List of invited users */}
      {props.participants.map(({ id, email }, i) => {
        return (
          <div key={id} className="invite__email">
            {email}
          </div>
        );
      })}
    </div>
  );
};

export default Invite;
