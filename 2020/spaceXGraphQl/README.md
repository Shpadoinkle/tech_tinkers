## Api Playground:
Built a simple react app that queries the public spaceX api at https://api.spacex.land/graphql/ for a list of Rocket types and the next upcoming launch.
# Note - SpaceX Api no longer available
- The original Api used for this has been removed. 
- Various clone replacements were available
    - Replaced api url with "https://spacex-production.up.railway.app/"
    - Although this api's previous launch endpoint does not honour any sorting variables passed to it, so can no longer show the latest launches first.

**Tech Stack Used**
- React with Typescript
- Apollo Client for Graphql query
- Run with lts node 12.22.12

**Deployment**

Deployed using firebase hosting, as it is quick and easy. Can be viewed [here](https://thoash-spacex.firebaseapp.com/)