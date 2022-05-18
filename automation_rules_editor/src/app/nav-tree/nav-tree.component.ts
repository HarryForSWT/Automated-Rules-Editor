import {FlatTreeControl} from '@angular/cdk/tree';
import {Component} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FileStructure {
  name: string;
  children?: FileStructure[];
}

const TREE_DATA: FileStructure[] = [
  {
    name: 'Documents',
    children:[
      {
        name: 'folder 1',
        children: [{name: 'Rule 1'}, {name: 'Rule 2'}],
      },
      {
        name: 'folder 2',
        children: [{name: 'sub-folder',children:[{name: 'Rule 1'}, {name: 'Rule 2'}]}],
      },
      {
        name: 'folder 3',
        children: [
          {
            name: 'sub-folder 1',
            children:[{name: 'Rule 1'}, {name: 'Rule 2'}]
          },
          {
            name: 'sub-folder 2',
            children:[{name: 'Rule 1'}, {name: 'Rule 2'}, {name: 'Rule 3'}, {name: 'Rule 4'}, {name: 'Rule 5'}]
          },
          {
            name: 'sub-folder 3',
            children:[{name: 'Rule 1'}, {name: 'Rule 2'}, {name: 'Rule 3'}, {name: 'Rule 4'}, {name: 'Rule 5'}]
          },
          {
            name: 'sub-folder 4',
            children:[{name: 'Rule 1'}, {name: 'Rule 2'}, {name: 'Rule 3'}, {name: 'Rule 4'}, {name: 'Rule 5'}]
          }
        ],
      },
      {
        name: 'folder 4',
        children: [
          {
            name: 'sub-folder 1',
            children:[{name: 'Rule 1'}, {name: 'Rule 2'}]
          },
          {
            name: 'sub-folder 2',
            children:[{name: 'Rule 1'}, {name: 'Rule 2'}, {name: 'Rule 3'}, {name: 'Rule 4'}, {name: 'Rule 5'}]
          }
        ],
      },
      {
        name: 'folder 5',
        children: [
          {
            name: 'sub-folder 1',
            children:[{name: 'Rule 1'}, {name: 'Rule 2'}]
          },
          {
            name: 'sub-folder 2',
            children:[{name: 'Rule 1'}, {name: 'Rule 2'}, {name: 'Rule 3'}, {name: 'Rule 4'}, {name: 'Rule 5'}]
          }
        ],
      },
    ] ,
  },
  {
    name: 'Categories',
    children:[{name: 'todo'}, {name: 'finances'}, {name: 'existence checks'},{name:'category a'},{name:'category z'}] ,
  },
];

/** Flat node with expandable and level information */
interface FilesFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}
@Component({
  selector: 'app-nav-tree',
  templateUrl: './nav-tree.component.html',
  styleUrls: ['./nav-tree.component.scss']
})
export class NavTreeComponent {
 
  private _transformer = (node: FileStructure, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<FilesFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: FilesFlatNode) => node.expandable;
}