export default function({ store, redirect }) {
  console.log(store.state.token);
  if (!store.state.token && store.state.initialLoadingDone) {
    return redirect("/login");
  }
}
