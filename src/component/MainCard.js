import React from 'react'
import { Text, Card, Button, Icon } from '@rneui/themed';



function MainCard({data}) {
  const {id,text, uri,btnText} = data;
  return (


    <Card>
    <Card.Title>{text}</Card.Title>
    <Card.Divider />
    <Card.Image
      style={{ padding: 0 }}
      source={{
        uri:uri
        }}
    />
    <Text style={{ marginVertical: 10,  }}>
      The idea with React Native Elements is more about component
      structure than actual design.
    </Text>
    <Button
      icon={
        <Icon
          name="code"
          color="#ffffff"
          iconStyle={{ marginRight: 10 }}
        />
      }
      buttonStyle={{
        borderRadius: 0,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0,
      }}
      title={btnText}
    />
  </Card>

  )
}

export default MainCard;
