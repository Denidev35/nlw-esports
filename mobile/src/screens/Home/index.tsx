import {  Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'

import logoImg from '../../assets/logo-nlw-esports.png'
import { Heading } from '../../components/Heading';
import { GameCard, GameCardProps as Game } from '../../components/GameCard'

import { styles } from './styles';
import { useEffect, useState } from 'react';
import { Background } from '../../components/Background';
import { useNavigation } from '@react-navigation/native';
import { DuoCard } from '../../components/DuoCard';

export function Home() {
  const [games, setGames] = useState<Game[]>([])

  const navigation = useNavigation()

  async function loadGames() {
    const response = await fetch('http://192.168.100.102:3333/games')
    const data = await response.json()

    setGames(data)
  }

  useEffect(() => {
    loadGames()
  }, [])

  function handleOpenGame({ id, title, bannerUrl }: Game) {
    navigation.navigate('game', { id, title, bannerUrl })
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image 
          source={logoImg}
          style={styles.logo}
        />

        <Heading 
          title='Encontre seu duo!'
          subtitle='Selecione o game que deseja jogar...'
        />

        <FlatList 
          data={games}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (

            <GameCard 
            data={item}
            onPress={() => handleOpenGame(item)}
            />
          )}
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={styles.contentList}
        />

      </SafeAreaView>
    </Background>
  );
}