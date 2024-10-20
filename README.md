
As a first-time user of Ignite and MobX, I decided to build upon the sample provided by Ignite. I added two screen components: UserList, which displays a list of users, and UserDetails, which shows detailed information for each post.

I stuck with the existing model structure and created a user model to manage both API calls and data updates. 

NB: While I've implemented all the necessary features, I encountered a couple of issues which is only happening in prod builds.

1. There is no loader displayed during API calls or related actions.
2. The data only loads if the API is terminated and restarted on the first run.

Prod build is available in github build folder
