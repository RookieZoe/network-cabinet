# network-cabinet

A 3D modeling project showcasing a custom-designed non-standard network cabinet that can be integrated into home cabinets.

Built with React + Three.js + TypeScript + Vite

## Model and Dimension Annotation Files

See the project Releases, which include the model STEP files and some dimension annotation files.

## Project BOM List

Project components are divided into three categories:

1. Custom cabinet parts - communicate with custom cabinet manufacturers and provide dimensions.
2. Off-the-shelf parts - can be purchased on online shopping platforms.
3. 3D printed parts - printed using FDM printers.

### 1. Custom Cabinet Parts

| Component             | Description                                                                                | Quantity | Dimensions (W×D×H, mm) | Notes                                                                                                           |
| --------------------- | ------------------------------------------------------------------------------------------ | -------- | ---------------------- | --------------------------------------------------------------------------------------------------------------- |
| Cabinet Body          | Communicate with custom cabinet manufacturer, just provide dimensions                      | 1        | 550×330×1520           | 330mm depth is the recommended minimum internal dimension, not recommended for customization if less than 330mm |
| Cabinet Door          | Communicate with custom cabinet manufacturer, leave space and provide dimensions           | 1        | 550×20×1520            |                                                                                                                 |
| Cabinet Lock          | Provided by custom cabinet manufacturer                                                    | 1        |                        |                                                                                                                 |
| Fan Mounting Position | Position for installing fans on cabinet door, communicate with custom cabinet manufacturer | 2        | 510×330×20             | Mounting position is a cabinet partition, 330mm depth recommends using 200mm case fans                          |

### 2. Off-the-shelf Parts

| Component                                | Description                                 | Quantity  | Dimensions                                  | Notes                                                                                                |
| ---------------------------------------- | ------------------------------------------- | --------- | ------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Cooling Fans                             | 200mm cooling fans                          | 4         |                                             | Recommended model: Phanteks PH-F200SP                                                                |
| Fan Temperature Control Speed Controller | 12V 4-channel PWM speed control             | 1         |                                             | [Product description (not affiliate)](http://jzcet.com/product/wenkong/20190524/62.html)             |
| Rack Posts                               | 22U posts                                   | 4         | 963mm×2.0mm (Height×Material thickness) 22U | [Taobao link (not affiliate)](https://item.taobao.com/item.htm?id=659182990496&skuId=4750798892337)  |
| 1U Shelf                                 | Finished shelf                              | As needed | 485mm×260mm×1.0mm (W×D×Material thickness)  | 260 depth is the smallest available shelf size                                                       |
| Heat Dissipation Baffle                  | Finished decorative parts installed on door | 2         | 500mm×15mm×80mm                             | [Taobao link (not affiliate)](https://detail.tmall.com/item.htm?id=729813476832&skuId=5057624064466) |
| Various Screws                           | Screws for installing various components    | As needed |                                             | Screw specifications can be configured as needed                                                     |

### 3. 3D Printed Parts

| Component           | Description                    | Quantity | Dimensions       | Notes                                                                             |
| ------------------- | ------------------------------ | -------- | ---------------- | --------------------------------------------------------------------------------- |
| Air Guide Structure | 3D printed air guide structure | 2        | 509mm×99mm×256mm | Limited by 3D printer size, can be cut into separate parts for printing as needed |

## Project Setup

```bash
yarn install
yarn dev
```

## Build

```bash
yarn build

# or build with Dockerfile
```

## License Description

1. The software part uses the MIT License.
2. The 3D model part uses the [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) License.
