import React, { useState, useMemo } from "react";

import Block from "../../components/Block";
import Text from "../../components/Text";
import { TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { theme } from "../../constants";

const { width } = Dimensions.get("window");

const User = () => {
  const [active, setActive] = useState("Products");
  const tabs = useMemo(() => ["Products", "Inspirations", "Shop"], []);

  const handleTab = (tab: string) => setActive(tab);

  const renderTab = (tab: string) => {
    const isActive = tab === active;
    return (
      <TouchableOpacity
        key={`tab-${tab}`}
        onPress={() => handleTab(tab)}
        style={[styles.tab, isActive && styles.active]}
      >
        <Text size={16} medium gray={!isActive} secondary={isActive}>
          {tab}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <Block center style={{ marginTop: 20 }}>
      <Block flex={false} row style={styles.tab}>
        {tabs.map((tab) => renderTab(tab))}
      </Block>
      {active === "Products" && <Text h1>Products</Text>}
      {active === "Inspirations" && <Text h1>Inspirations</Text>}
      {active === "Shop" && <Text h1>Shop</Text>}
    </Block>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
  },
  tabs: {
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: theme.sizes.base,
    marginHorizontal: theme.sizes.base * 2,
  },
  tab: {
    marginRight: theme.sizes.base * 2,
    paddingBottom: theme.sizes.base,
  },
  active: {
    borderBottomColor: theme.colors.secondary,
    borderBottomWidth: 3,
  },
  category: {
    minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
  },
});

export default User;
