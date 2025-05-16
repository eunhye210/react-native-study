import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HeaderButton, Text } from '@react-navigation/elements';
import {
  createStaticNavigation,
  StaticParamList,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { Home } from './screens/Home';
import { Profile } from './screens/Profile';
import { Settings } from './screens/Settings';
import { Updates } from './screens/Updates';
import { NotFound } from './screens/NotFound';
import Home2 from './screens/Home2';
import MovieDetail from './screens/MovieDetail';

const HomeTabs = createBottomTabNavigator({
  screens: {
    Home1: {
      screen: Home,
      options: {
        title: 'Home1',
        tabBarIcon: ({ color, size }) => (
          <AntDesign name="book" size={size} color={color} />
        ),
      },
    },
    Home2: {
      screen: Home2,
      options: {
        title: 'Home2',
        tabBarIcon: ({ color, size }) => (
          <AntDesign name="setting" size={size} color={color} />
        ),
        tabBarLabelStyle: {
          fontFamily: 'NotoSansKR',
          fontSize: 10,
        },
      },
    },
    Updates: {
      screen: Updates,
      options: {
        title: 'Updates',
        tabBarIcon: ({ color, size }) => (
          <Feather name="alert-triangle" size={size} color={color} />
        ),
      },
    },
  },
});

const RootStack = createNativeStackNavigator({
  screens: {
    HomeTabs: {
      screen: HomeTabs,
      options: {
        title: 'Home',
        headerShown: false,
      },
    },
    MovieDetail: {
      screen: MovieDetail,
      linking: {
        path: 'movie/:id',
        parse: {
          id: (value) => parseInt(value, 10),
        },
      },
      options: {
        title: 'Movie Detail',
        headerShown: true,
      },
    },
    Profile: {
      screen: Profile,
      linking: {
        path: ':user(@[a-zA-Z0-9-_]+)',
        parse: {
          user: (value) => value.replace(/^@/, ''),
        },
        stringify: {
          user: (value) => `@${value}`,
        },
      },
    },
    Settings: {
      screen: Settings,
      options: ({ navigation }) => ({
        presentation: 'modal',
        headerRight: () => (
          <HeaderButton onPress={navigation.goBack}>
            <Text>Close</Text>
          </HeaderButton>
        ),
      }),
    },
    NotFound: {
      screen: NotFound,
      options: {
        title: '404',
      },
      linking: {
        path: '*',
      },
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
