import localForage from "localforage";
import { observable } from "mobx";
import { create, persist } from "mobx-persist";

class UserStore {
  @observable hydrated = false;

  @persist("list")
  @observable
  favourites = [];
}

const hydrate = create({
  storage: localForage,
  jsonify: false,
});

const userStore = new UserStore();

hydrate("UserStore", userStore).then(() => {
  userStore.hydrated = true;
});

export default userStore;
