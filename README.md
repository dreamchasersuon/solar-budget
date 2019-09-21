# solar-budget
Solar Budget is mobile finance-flow management application.
Currently in development.

To run this project locally you need to download it. Also, you need to have the latest Android Studio installed to build the application (cause its ejected app: https://docs.expo.io/versions/latest/expokit/eject/) and Expo Cli (https://docs.expo.io/versions/latest/workflow/expo-cli/):

1. run `git clone https://github.com/dreamchasersuon/solar-budget.git`
in directory of your choice;
2. got to `cd solar-budget`;
3. run `yarn` to initialize dependencies;
4. run `expo start` to open metro bundler;
5. run `expo publish` - you need to serve application on your network (note, if you will change network, you will need to `expo publish` and rebuild app);
6. open Android Studio and make build (metro bundler should work);
7. download application on your phone and install it.

If you want to complete the issue add a comment like 'Working on it' make sure to create new branch with tag of issue (e.g #3). Redux logic should be covered by tests.

Here is a link to design: https://www.figma.com/file/KNJUkfyRk3Wdc9GNmdUW92Mo/Solar-Budget?node-id=0%3A1

