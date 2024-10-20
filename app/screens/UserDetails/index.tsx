/* eslint-disable react-native/sort-styles */
/* eslint-disable react-native/no-color-literals */
import { Card } from "@/components"
import { useStores } from "@/models/helpers/useStores"
import { navigationRef } from "@/navigators"
import { UserPostInterface } from "@/types/User"
import { useAppTheme } from "@/utils/useAppTheme"
import AntDesign from "@expo/vector-icons/AntDesign"
import Entypo from "@expo/vector-icons/Entypo"
import { StatusBar } from "expo-status-bar"
import { useEffect, useRef, useState } from "react"
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import { RefreshControl } from "react-native-gesture-handler"

const UserDetailsScreen = ({ route }) => {
  const { UserStore } = useStores()
  // eslint-disable-next-line react/prop-types
  const userId = route?.params?.userID

  const {
    theme: { colors, isDark },
  } = useAppTheme()

  const [pageNo, setPageNo] = useState<number>(0)

  const totalPages = UserStore.totalPages
  const totalPagesRef = useRef<number>(totalPages)
  totalPagesRef.current = totalPages

  useEffect(() => {
    onMount()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onMount = async () => {
    // await UserStore.fetchUsersPost
    await UserStore.fetchUsersPost(userId, pageNo)
  }

  const loadMore = () => {
    if (!UserStore.isLoadingMore) {
      if (pageNo < UserStore.totalPages) {
        const nextPage = pageNo + 1
        setPageNo(nextPage)
        UserStore.fetchUsersPost(userId, nextPage)
      }
    }
  }

  const _onBack = () => {
    navigationRef.goBack()
  }

  const _renderItem: ListRenderItem<UserPostInterface> = ({ item }) => {
    return (
      <>
        <Card
          preset="reversed"
          verticalAlignment="space-between"
          // LeftComponent={<Image style={styles.img} source={{ uri: item?.image }} />}
          heading={`${item?.title ?? ""}`}
          headingStyle={{
            color: !isDark ? colors.palette.neutral100 : colors.palette.neutral900,
          }}
          HeadingTextProps={{ weight: "bold", size: "xl" }}
          content={`${item?.body}`}
          contentStyle={styles.contentStyle}
          ContentTextProps={{ weight: "medium", size: "xs" }}
          footer={`${item?.tags?.join(",")}`}
          footerStyle={styles.footerStyle}
          FooterTextProps={{ weight: "light", size: "xxs" }}
          FooterComponent={
            <View style={styles.footerContainer}>
              <Text style={styles.footerStyle}>{`${item?.tags?.join(",")}`}</Text>
              <View style={styles.reactionContainer}>
                <View style={styles.likesContainer}>
                  <AntDesign name="like1" size={22} color="green" />
                  <Text style={styles.greenColor}>{`${item?.reactions?.likes}`}</Text>
                </View>

                <View style={styles.likesContainer}>
                  <AntDesign name="dislike1" size={22} color="red" />
                  <Text style={styles.redColor}>{`${item?.reactions?.dislikes}`}</Text>
                </View>
              </View>
            </View>
          }
        />
      </>
    )
  }

  const handleRefresh = () => {
    UserStore.fetchUsersPost(userId, 1)
    setPageNo(1)
  }

  const renderFooter = () => {
    if (!UserStore.isPostLoadingMore || UserStore?.posts.length < 8) return <></> // Do not show footer loader for the first page
    return <ActivityIndicator animating size="large" />
  }
  console.log("colors", colors)
  return (
    <SafeAreaView style={styles.flex1}>
      <StatusBar />
      <View style={styles.flex1}>
        <View style={styles.backBtnView}>
          <TouchableOpacity onPress={_onBack} style={styles.backBtn}>
            <Entypo name="chevron-left" size={24} color="blue" />
            <Text
              style={{
                color: colors.text,
              }}
            >
              Go Back
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          contentContainerStyle={styles.flatListCCS}
          keyExtractor={(_, i) => i?.toString()}
          data={UserStore.posts ?? []}
          renderItem={_renderItem}
          refreshControl={
            <RefreshControl refreshing={UserStore.isPostLoading} onRefresh={handleRefresh} />
          }
          renderFooter={renderFooter}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListEmptyComponent={<Text>No Posts found</Text>}
        />
      </View>
    </SafeAreaView>
  )
}

export default UserDetailsScreen

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  flatListCCS: {
    gap: 20,
    padding: 20,
  },
  contentStyle: { color: "gray" },
  footerStyle: { color: "#B0B0B0", marginBottom: 10 },
  footerContainer: {
    marginVertical: 10,
  },
  reactionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likesContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  greenColor: {
    color: "green",
  },
  redColor: {
    color: "red",
  },
  backBtnView: {
    flexDirection: "row",
    margin: 10,
  },
  backBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
})
