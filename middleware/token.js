export default function({ store, redirect }) {
  console.log(store.state);
  if (!store.state.token) {
    return redirect("/login");
  }
}
