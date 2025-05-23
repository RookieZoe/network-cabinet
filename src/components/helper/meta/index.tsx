export type ModelPart = {
  name: string;
  description: string;
  size: {
    width: number; // 长
    depth: number; // 深（宽）
    height: number; // 高
    unit: 'mm' | 'dm' | 'cm' | 'm';
  };
};

export const modelParts: Record<
  string,
  {
    [lang: string]: ModelPart;
  }
> = {
  Door: {
    zh: {
      name: '柜门',
      description: '在橱柜生产商定制，上下开方孔，用于安装通风口',
      size: {
        width: 550,
        depth: 20,
        height: 1520,
        unit: 'mm'
      }
    },
    en: {
      name: 'Door',
      description:
        'Custom made by the cabinet manufacturer, with square holes for ventilation',
      size: {
        width: 550,
        depth: 20,
        height: 1520,
        unit: 'mm'
      }
    }
  },
  Cabinet: {
    zh: {
      name: '机柜柜体',
      description:
        '在橱柜生产商定制，重点关注内部尺寸，330mm 的深度是建议安装的最小尺寸，小于这个尺寸可能会影响设备安装。内部宽度为标准 510mm，高度则可以根据需要进行调整。这里是 22U',
      size: {
        width: 550,
        depth: 330,
        height: 1520,
        unit: 'mm'
      }
    },
    en: {
      name: 'Cabinet Main Part',
      description:
        'Custom made by the cabinet manufacturer, focusing on internal dimensions. A depth of 330mm is the minimum recommended for installation; less than this may affect device installation. The internal width is standard at 510mm, and the height can be adjusted as needed. Here it is 22U.',
      size: {
        width: 550,
        depth: 330,
        height: 1520,
        unit: 'mm'
      }
    }
  },
  AirNet: {
    zh: {
      name: '散热挡板',
      description: '成品装饰件，安装在柜门的上下方孔上，起到美观和散热的作用',
      size: {
        width: 500,
        depth: 15,
        height: 80,
        unit: 'mm'
      }
    },
    en: {
      name: 'Heat Dissipation Baffle',
      description:
        'Finished decorative piece, installed on the upper and lower holes of the cabinet door, serving both aesthetic and cooling functions',
      size: {
        width: 500,
        depth: 15,
        height: 80,
        unit: 'mm'
      }
    }
  },
  AirDuct: {
    zh: {
      name: '风道结构件',
      description:
        '3D打印件，安装在机柜的上下两处，用于引导风道。受限于3D打印机的尺寸，可以看情况切割分件打印。',
      size: {
        width: 509,
        depth: 99,
        height: 256,
        unit: 'mm'
      }
    },
    en: {
      name: 'Air Duct Structure',
      description:
        '3D printed parts, installed at the top and bottom of the cabinet, are used to guide the air duct. Due to the size limitations of the 3D printer, they can be cut and printed in separate pieces as needed.',
      size: {
        width: 509,
        depth: 99,
        height: 256,
        unit: 'mm'
      }
    }
  },
  FanDock: {
    zh: {
      name: '风扇安装位',
      description: '在橱柜生产商定制，用于安装 200mm 散热风扇，上下各两个',
      size: {
        width: 510,
        depth: 330,
        height: 20,
        unit: 'mm'
      }
    },
    en: {
      name: 'Fan Mounting Position',
      description:
        'Customized by the cabinet manufacturer for installing 200mm cooling fans, two on the top and two on the bottom.',
      size: {
        width: 510,
        depth: 330,
        height: 20,
        unit: 'mm'
      }
    }
  },
  RackPost: {
    zh: {
      name: '机柜立柱',
      description: '成品 22U 立柱，共 4 根，可以根据实机情况缩减为 2 根',
      size: {
        width: 62,
        depth: 29,
        height: 983,
        unit: 'mm'
      }
    },
    en: {
      name: 'Rack Post',
      description:
        'Finished 22U columns, a total of 4 pieces, can be reduced to 2 pieces according to actual conditions.',
      size: {
        width: 62,
        depth: 29,
        height: 983,
        unit: 'mm'
      }
    }
  },
  ServerExample: {
    zh: {
      name: '2U 设备',
      description: '示例 2U 设备',
      size: {
        width: 483,
        depth: 220,
        height: 89,
        unit: 'mm'
      }
    },
    en: {
      name: '2U Device',
      description: 'Example of a 2U device',
      size: {
        width: 483,
        depth: 220,
        height: 89,
        unit: 'mm'
      }
    }
  },
  Tray: {
    zh: {
      name: '1U 托盘',
      description: '成品托盘，这是这个深度的能买到的最小的成品托盘尺寸',
      size: {
        width: 485,
        depth: 260,
        height: 47,
        unit: 'mm'
      }
    },
    en: {
      name: '1U Tray',
      description:
        'Finished tray, this is the smallest finished tray size available for this depth',
      size: {
        width: 485,
        depth: 260,
        height: 47,
        unit: 'mm'
      }
    }
  }
};
