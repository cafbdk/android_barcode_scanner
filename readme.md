If you are having some sort of error, where the device cannot find the development server, the following should take care of it.

`react-native start > /dev/null 2>&1`
`adb reverse tcp:8081 tcp:8081`
