import { useRef } from 'react';
import { Rectangle } from 'pixi.js';
import { useApp, Sprite, Container } from '@inlet/react-pixi';
import {
  layers,
  width,
  height,
  tilewidth,
  tileheight,
  tilesets,
} from '../../map2.json';

const GrassSprite = () => {
  const app = useApp();
  const grassTextureMap = useRef({});
  const grassTexture = app.loader.resources.town_grass.texture;
  const tileSetCols = tilesets[0].columns;

  const tiles = layers[0].data.map((num, index) => {
    let texture;

    /** set rectangle */
    const x = ((num - 1) % tileSetCols) * tilewidth;
    const y = tileheight * Math.floor((num - 1) / tileSetCols);
    const tile = new Rectangle(x, y, tilewidth, tileheight);

    /**
     * handle texture object
     */
    const textureKey = `${x}${y}`;
    if (grassTextureMap.current[textureKey]) {
      // already exist
      texture = grassTextureMap.current[textureKey];
    } else {
      // not exist, clone and store
      const cloned = grassTexture.clone();
      cloned.frame = tile;

      grassTextureMap.current[textureKey] = cloned;
      texture = cloned;
    }

    return (
      <Sprite
        x={(index % width) * tilewidth}
        y={tileheight * Math.floor(index / width)}
        texture={texture}
      ></Sprite>
    );
  });

  return (
    <Container
      width={width * tilewidth}
      height={height * tileheight}
      anchor={0.5}
    >
      {tiles.map((tile) => {
        return tile;
      })}
    </Container>
  );
};

export default GrassSprite;
