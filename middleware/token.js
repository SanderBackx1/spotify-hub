export default function({ store, redirect }) {
  if (!store.state.token && store.state.initialLoadingDone) {
    return redirect("/login");
  }
}
