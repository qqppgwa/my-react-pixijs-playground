import { useRef } from 'react';
import inRange from 'lodash/inRange';
import { Rectangle } from 'pixi.js';
import { useApp, Sprite, Container } from '@inlet/react-pixi';
import {
  layers,
  width,
  height,
  tilewidth,
  tileheight,
  tilesets,
} from '../../map_multi_sets.json';

const GrassSprite = () => {
  const app = useApp();

  const grassTextureMap = useRef({});

  const getTileSetIndex = (num) => {
    const index = tilesets.findIndex((set) => {
      const { firstgid, tilecount } = set;

      return inRange(num, firstgid, firstgid + tilecount);
    });

    return index;
  };

  const imagesLayers = layers.map((layer, index) => {
    const tiles = layer.data.map((tileIndex, index) => {
      let texture;

      if (tileIndex === 0) return null;

      const { columns: tileSetCols, firstgid, name } = tilesets[
        getTileSetIndex(tileIndex)
      ];

      /** set rectangle */
      const x = ((tileIndex - firstgid) % tileSetCols) * tilewidth;
      const y = tileheight * Math.floor((tileIndex - firstgid) / tileSetCols);
      const tile = new Rectangle(x, y, tilewidth, tileheight);

      /**
       * handle texture object
       */

      const grassTexture = app.loader.resources[`town_${name}`].texture;

      const textureKey = `${name}_${x}${y}`;
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
          key={index}
        />
      );
    });
    return tiles;
  });

  return (
    <Container
      width={width * tilewidth}
      height={height * tileheight}
      anchor={0.5}
    >
      {imagesLayers.map((layer) => {
        return layer;
      })}
    </Container>
  );
};

export default GrassSprite;
