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
    }
  },
  AirDuct: {
    zh: {
      name: '风道结构件',
      description: '3D打印件，安装在机柜的上下两处，用于引导风道',
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
      name: '风扇安装支架',
      description: '在橱柜生产商定制，用于安装 200mm 散热风扇，上下各两个',
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
    }
  }
};
