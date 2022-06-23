# Name Change FrontEnd:

**Development notes**
Built using React, Apollo, Mobx. Backend was deployed on Heroku, so some requests can be a bit slow as it is deployed to US servers.
Live version can be found here on my [firebase project](https://thoash-namechange.web.app/)

**Getting Started**
To run this application locally, your environment file will have to point to your running backend. Use the .envExample for the correct .env setup. Then run.

- yarn
- yarn dev

**Using the platform**
You can login or signup when you first open the website. You will also get the able to check which citizen names are about to expire in the next 28 days if you follow the link under the signin form.

**Sign up notes**..
You will be asked for a name on signup. If the name entered clashes with an existing citizens current name, your registration will be denied. You must have a unique name.

**Signed In**
Once you are signed in. The inner website is straightforward. You will first see your profile with your current name, a list of previous names you have used, and a form for updating your current name. If you attempt to change your name to a name that is already in use, your request will fail.
You can use the side navigation to see what names are due to expire in the next 28 days.

**Reflection on Future changes**

- Currently only supports a single name input. In future would allow first and last name inputs.. name validation would only check for unique matchups of the two.. ie- country can have a Scott Homles and Scott Watson at the same time.
