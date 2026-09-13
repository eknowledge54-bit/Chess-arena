import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { WebView } from "react-native-webview";
import { CHESS_ARENA_HTML } from "./assets/chessArenaHtml";

export default function App() {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      if (!CHESS_ARENA_HTML || CHESS_ARENA_HTML.length < 1000) {
        throw new Error("Chess Arena game file is missing.");
      }
      setReady(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Startup error");
    }
  }, []);

  if (error) return (
    <View style={styles.center}>
      <StatusBar style="light" />
      <Text style={styles.mark}>♞</Text>
      <Text style={styles.title}>CHESS ARENA</Text>
      <Text style={styles.error}>{error}</Text>
    </View>
  );

  if (!ready) return (
    <View style={styles.center}>
      <StatusBar style="light" />
      <Text style={styles.mark}>♞</Text>
      <Text style={styles.title}>CHESS ARENA</Text>
      <ActivityIndicator size="large" />
      <Text style={styles.loading}>Loading game...</Text>
    </View>
  );

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <WebView
        source={{ html: CHESS_ARENA_HTML, baseUrl: "https://chess-arena.local/" }}
        style={styles.webview}
        originWhitelist={["*"]}
        javaScriptEnabled
        domStorageEnabled
        setSupportMultipleWindows={false}
        allowsInlineMediaPlayback
        onError={(e) => setError(e.nativeEvent.description || "Game screen failed to load.")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#070a0f" },
  webview: { flex: 1, backgroundColor: "#070a0f" },
  center: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#070a0f", padding: 24 },
  mark: { fontSize: 64, marginBottom: 8 },
  title: { color: "#e2b85f", fontSize: 25, fontWeight: "800", letterSpacing: 2, marginBottom: 24 },
  loading: { color: "#999", marginTop: 12 },
  error: { color: "#ddd", textAlign: "center", marginTop: 12 }
});
