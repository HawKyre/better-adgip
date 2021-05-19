import {
    DecisionNode,
    DTree,
    ResultNode,
    RandomNode,
} from '../../decision-trees/DTree';
import * as d3 from 'd3';
import { useEffect, useRef, useState } from 'react';
import { NodeData, VisualizationSettings } from '../../types/types';

interface TreeGraphProps {
    tree: DTree;
    showNodeContextMenu: any;
    isOptimalTree: boolean;
    settings: VisualizationSettings;
}

const TreeGraph: React.FC<TreeGraphProps> = ({
    tree,
    showNodeContextMenu,
    isOptimalTree,
    settings,
}) => {
    const divRef = useRef();
    const svgRef = useRef();
    useEffect(() => {
        // console.log(tree.getDataTree());

        if (svgRef && svgRef.current) {
            svgRef.current.innerHTML = '';
        }

        const width = window.innerWidth;
        const height = window.innerHeight;
        const root_dx = settings.rootDx;
        const root_dy = settings.rootDy;

        let d3tree = (data: object) => {
            const root = d3.hierarchy(data);
            root.dx = root_dx;
            root.dy = root_dy;
            return d3.tree().nodeSize([root.dx, root.dy])(root);
        };

        const root = d3tree(
            isOptimalTree ? tree.getOptimalTree() : tree.getDataTree()
        ) as NodeData;

        let x0 = Infinity;
        let x1 = -x0;
        root.each((d) => {
            if (d.x > x1) x1 = d.x;
            if (d.x < x0) x0 = d.x;
        });
        const spacing = settings.spacing;
        const widthScale = settings.widthScale;

        const svg = d3
            .select(svgRef.current)
            .attr('viewBox', [0, 0, width, height])
            .attr('preserveAspectRatio', 'none');

        const g = svg
            .append('g')
            .attr('font-family', 'sans-serif')
            .attr('font-size', 10);

        const diagonalPercent = settings.diagonalPercent;
        const link = g
            .append('g')
            .attr('fill', 'none')
            // .attr('stroke-opacity', 0.4)
            // .attr('stroke-width', 2)
            .selectAll('path')
            .data(root.links())
            .join('path')
            .attr('d', (d) => {
                return `m ${d.source.y * widthScale} ${
                    d.source.x * spacing
                } l ${
                    (d.target.y - d.source.y) * widthScale * diagonalPercent
                } ${(d.target.x - d.source.x) * spacing} h ${
                    (d.target.y - d.source.y) *
                    (1 - diagonalPercent) *
                    widthScale
                }`;
            })
            // .attr('class', (d) => {
            //     if (!isOptimalTree) {
            //         return 'stroke-current text-gray-800';
            //     } else if (d.target.data.isBranchGood) {
            //         return 'stroke-current text-black';
            //     } else {
            //         return 'stroke-current text-gray-200';
            //     }
            // })
            .attr('style', (d) => {
                if (!isOptimalTree) {
                    return `stroke: currentColor; stroke-width: ${
                        settings.normalStroke.width
                    }; opacity: ${
                        settings.normalStroke.color.opacity
                    }; color: ${settings.normalStroke.color.formatHex()};`;
                } else if (d.target.data.isBranchGood) {
                    return `stroke: currentColor; stroke-width: ${
                        settings.goodPathStroke.width
                    }; opacity: ${
                        settings.goodPathStroke.color.opacity
                    }; color: ${settings.goodPathStroke.color.formatHex()};`;
                } else {
                    return `stroke: currentColor; stroke-width: ${
                        settings.badPathStroke.width
                    }; opacity: ${
                        settings.badPathStroke.color.opacity
                    }; color: ${settings.badPathStroke.color.formatHex()};`;
                }
            });
        // .attr("d", d3.linkHorizontal()
        //     .x(d => d.y * widthScale)
        //     .y(d => d.x * spacing));

        const node = g
            .append('g')
            .attr('stroke-linejoin', 'round')
            // .attr('stroke-width', 3)
            .selectAll('g')
            .data(root.descendants())
            .join('g')
            .attr(
                'transform',
                (d) => `translate(${d.y * widthScale},${d.x * spacing})`
            )
            .on('contextmenu', showNodeContextMenu);

        const scale = settings.nodeScale;
        node.append('path')
            .attr(
                'd',
                d3
                    .symbol()
                    .size((d: NodeData) => {
                        if (d.data.type === 'DEC') return 3000 * scale;
                        if (d.data.type === 'RND') return 3000 * scale;
                        if (d.data.type === 'RES') return 1800 * scale;
                        throw new Error('Unrecognized node type.');
                    })
                    .type((d: NodeData) => {
                        if (d.data.type === 'DEC') return d3.symbolSquare;
                        if (d.data.type === 'RND') return d3.symbolCircle;
                        if (d.data.type === 'RES') return d3.symbolTriangle;
                        throw new Error('Unrecognized node type.');
                    })
            )
            .attr('fill', (d: NodeData) => {
                if (d.data.type === 'DEC') return '#FFCE97';
                if (d.data.type === 'RND') return '#B9FF97';
                if (d.data.type === 'RES') return '#AB97FF';
                throw new Error('Unrecognized node type.');
            })
            .attr('transform', (d: NodeData) => {
                if (d.data.type == 'RES') return 'translate(-8, 0), rotate(90)';
                else return '';
            });

        let nodeText = node.append('g').data(root.descendants()).join('g');

        nodeText
            .filter((d: NodeData) => d.data.label !== 'root')
            .append('text')
            .text((d: NodeData) => d.data.label)
            .attr('font-family', 'Source Sans Pro')
            .attr('font-size', settings.fontSize)
            .attr('dy', '-0.4rem')
            .attr('x', -35)
            .attr('text-anchor', 'end');

        // const textBBox = nodeText._parents.map((x) => x.getBBox());
        // const textCTM = nodeText._groups[0].map((x) => x.getCTM());

        let nodeProb = node.append('g').data(root.descendants()).join('g');

        nodeProb
            .filter((d: NodeData) => d.data.probability !== undefined)
            .append('text')
            .text((d: NodeData) => `${(d.data.probability! * 10000) / 100}%`)
            .attr('dy', '0.9rem')
            .attr('x', -35)
            .attr('font-family', 'Source Sans Pro')
            .attr('font-size', settings.fontSize)
            .attr('text-anchor', 'end');

        let nodeValue = node.append('g').data(root.descendants()).join('g');

        nodeValue
            .filter(
                (d: NodeData) =>
                    d.data.value !== undefined &&
                    d.data.value !== 0 &&
                    d.data.label !== 'root'
            )
            .append('text')
            .text((d: NodeData) => `Valor: ${d.data.value}`)
            .attr('dy', '-1.4rem')
            .attr('x', -35)
            .attr('font-family', 'Source Sans Pro')
            .attr('font-size', settings.fontSize)
            .attr('text-anchor', 'end');

        nodeValue
            .filter((d: NodeData) => d.data.expectedValue !== undefined)
            .append('text')
            .text((d: NodeData) => `VEM: ${d.data.expectedValue}`)
            .attr('dy', (d) => {
                if (d.data.label === 'root') return '0.2rem';
                if (d.data.probability === undefined) return '1rem';
                return '1.85rem';
            })
            .attr('x', -35)
            .attr('font-family', 'Source Sans Pro')
            .attr('font-size', settings.fontSize)
            .attr('text-anchor', 'end');

        if (svgRef && svgRef.current) {
            const bbox = svgRef.current.getBBox();
            d3.select(svgRef.current).attr('viewBox', [
                0,
                0,
                Math.max(width - 10, bbox.width + 100),
                Math.max(height, bbox.height + 280),
            ]);
            // console.log(bbox);

            g.attr('transform', `translate(${100},${-bbox.y + 20})`);
        }
    }, [tree, isOptimalTree, settings]);

    return (
        <div ref={divRef} className="overflow-visible h-full">
            <svg ref={svgRef} className="overflow-visible h-full"></svg>
        </div>
    );
};

export default TreeGraph;
