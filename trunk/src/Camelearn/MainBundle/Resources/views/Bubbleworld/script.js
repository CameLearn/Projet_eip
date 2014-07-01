function Node(label, amount, color)
{
    this.label = label;
    this.amount = amount;
    this.color = color;
    this.children = new Array();
}

//Ca sert a rien a part faire joli
function addEx(node, nb)
{
    for (var i = 0; i < nb - 1; i++)
    	node.children.push(new Node('Exercice ' + (i + 1), 100/nb, vis4color.fromHex(node.color).lightness('*'+(1+Math.random()*.5)).x));
    var bilan = new Node("Bilan", 100/nb, vis4color.fromHex(node.color).lightness('*'+(1+Math.random()*.5)).x);
    bilan.link = "./Mini-jeux/index.html"
    node.children.push(bilan);
}



$(function() {

    var root = new Node('CameLearn', 75, vis4color.fromHSL(34.5, .7, .6).x);
//    root.taxonomy = BubbleTree.Styles.Cofog; //Je sais pas comment ca marche..

    root.children.push(new Node('Nombres et calculs', 25, vis4color.fromHSL(0, .7, .5).x));
    root.children[0].children.push(new Node('Numérotation décimale', 25, vis4color.fromHex(root.children[0].color).lightness('*'+(.5+Math.random()*.5)).x));
    root.children[0].children.push(new Node('Addition', 25, vis4color.fromHex(root.children[0].color).lightness('*'+(.5+Math.random()*.5)).x));
    root.children[0].children.push(new Node('Soustraction', 25, vis4color.fromHex(root.children[0].color).lightness('*'+(.5+Math.random()*.5)).x));
    root.children[0].children.push(new Node('Multiplication', 25, vis4color.fromHex(root.children[0].color).lightness('*'+(.5+Math.random()*.5)).x));

    //Ca sert a rien a part faire joli
    addEx(root.children[0].children[0], 1);
    addEx(root.children[0].children[1], 4);
    addEx(root.children[0].children[2], 3);
    addEx(root.children[0].children[3], 8);

    root.children.push(new Node('Géométrie', 25, vis4color.fromHSL(220, .7, .5).x));
    root.children[1].children.push(new Node('Carré', 30, vis4color.fromHex(root.children[1].color).lightness('*'+(.5+Math.random()*.5)).x));
    root.children[1].children.push(new Node('Triangle', 30, vis4color.fromHex(root.children[1].color).lightness('*'+(.5+Math.random()*.5)).x));
    root.children[1].children.push(new Node('Cercle', 40, vis4color.fromHex(root.children[1].color).lightness('*'+(.5+Math.random()*.5)).x));

    //Ca sert a rien a part faire joli
    addEx(root.children[1].children[0], 5);
    addEx(root.children[1].children[1], 3);
    addEx(root.children[1].children[2], 6);

    root.children.push(new Node('Grandeurs et mesures', 25, vis4color.fromHSL(120, .7, .5).x));
    root.children[2].children.push(new Node('Unites de mesure', 33, vis4color.fromHex(root.children[2].color).lightness('*'+(.5+Math.random()*.5)).x));
    root.children[2].children.push(new Node('Problemes', 33, vis4color.fromHex(root.children[2].color).lightness('*'+(.5+Math.random()*.5)).x));
    root.children[2].children.push(new Node('Prochain niveau', 33, vis4color.fromHex(root.children[2].color).lightness('*'+(.5+Math.random()*.5)).x));

    //Ca sert a rien a part faire joli
    addEx(root.children[2].children[0], 2);
    addEx(root.children[2].children[1], 3);
    addEx(root.children[2].children[2], 4);

    new BubbleTree({
	data: root,
    sortBy: 'label',
	container: '.bubbletree',
    bubbleType: 'icon',
    bubbleStyles: {
    'cofog-1': BubbleTree.Styles.Cofog,
    'cofog-2': BubbleTree.Styles.Cofog,
    'cofog-3': BubbleTree.Styles.Cofog
    }
    });
});
