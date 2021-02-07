import { Container, Typography } from "@material-ui/core";

import { User } from "../App";

interface Props {
  user: User;
}

const Participant: React.FC<Props> = ({ user }) => {
  return (
    <Container maxWidth="xs">
      <Typography component="h1" variant="h3">
        Participant
      </Typography>
      <Typography variant="body1">{user.email}</Typography>
    </Container>
  );
};

export default Participant;
