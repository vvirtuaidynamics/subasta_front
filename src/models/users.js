import useFields from "src/config/fields";

export default function User() {
  const {user_name, name, last_name} = useFields();

  user_name.props = {}

  const columns = [];
  const blank = [user_name, name, last_name];
  const show = [];
  return {
    fields: {
      name, last_name
    },
    columns, blank, show

  }
}
