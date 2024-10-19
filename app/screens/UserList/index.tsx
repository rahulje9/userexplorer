/* eslint-disable react-native/sort-styles */
/* eslint-disable react-native/no-color-literals */
import { Card } from "@/components"
import { useStores } from "@/models/helpers/useStores"
import { UserInterface } from "@/types/User"
import { StatusBar } from "expo-status-bar"
import { useEffect, useRef, useState } from "react"
import {
  ActivityIndicator,
  FlatList,
  Image,
  ListRenderItem,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native"

const UserList = () => {
  const { UserStore } = useStores()
  const [pageNo, setPageNo] = useState<number>(0)

  const totalPages = UserStore.totalPages
  const totalPagesRef = useRef<number>(totalPages)
  totalPagesRef.current = totalPages

  useEffect(() => {
    onMount()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onMount = async () => {
    await UserStore.fetchUserList(pageNo)
  }

  const onCardPress = (item: UserInterface) => {}

  const _renderItem: ListRenderItem<UserInterface> = ({ item }) => {
    return (
      <Card
        onPress={() => {
          onCardPress(item)
        }}
        preset="reversed"
        verticalAlignment="space-between"
        LeftComponent={<Image style={styles.img} source={{ uri: item?.image }} />}
        heading={`${item?.firstName} ${item?.lastName}`}
        headingStyle={styles.headingStyle}
        HeadingTextProps={{ weight: "bold", size: "xl" }}
        content={`${item?.company?.name}`}
        contentStyle={styles.contentStyle}
        ContentTextProps={{ weight: "medium", size: "xs" }}
        footer={`${item?.company?.address?.address}`}
        footerStyle={styles.footerStyle}
        FooterTextProps={{ weight: "light", size: "xxs" }}
      />
    )
  }

  const renderFooter = () => {
    if (!UserStore.isLoadingMore || UserStore?.users.length < 8) return <></> // Do not show footer loader for the first page
    return <ActivityIndicator animating size="large" />
  }

  const loadMore = () => {
    if (!UserStore.isLoadingMore) {
      if (pageNo < UserStore.totalPages) {
        const nextPage = pageNo + 1
        setPageNo(nextPage)
        UserStore.fetchUserList(nextPage)
      }
    }
  }

  const handleRefresh = () => {
    UserStore.fetchUserList(1)
    setPageNo(1)
  }

  return (
    <SafeAreaView style={styles.flex1}>
      <StatusBar />
      <View style={styles.flex1}>
        <FlatList
          contentContainerStyle={styles.flatListCCS}
          keyExtractor={(_, i) => i?.toString()}
          data={UserStore.users ?? []}
          renderItem={_renderItem}
          refreshControl={
            <RefreshControl refreshing={UserStore.isLoading} onRefresh={handleRefresh} />
          }
          renderFooter={renderFooter}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
        />
      </View>
    </SafeAreaView>
  )
}

export default UserList

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  img: {
    height: 70,
    width: 70,
    alignSelf: "center",
    borderWidth: 0.5,
    borderRadius: 10,
    overflow: "hidden",
  },
  headingStyle: { color: "#000" },
  contentStyle: { color: "gray" },
  footerStyle: { color: "gray" },
  flatListCCS: {
    gap: 20,
    padding: 20,
  },
})
