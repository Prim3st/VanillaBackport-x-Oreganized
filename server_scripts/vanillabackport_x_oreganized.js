let tags_for_spears = [
    'minecraft:spears',
    'minecraft:lunge_enchantable',
    'minecraft:enchantable/weapon',
    'minecraft:enchantable/sharp_weapon',
    'minecraft:enchantable/sword',
    'minecraft:enchantable/durability',
    'minecraft:enchantable/fire_aspect',
    'minecraft:enchantable/vanishing',
    'c:tools',
    'c:enchantables'
];
let tags_for_nautilus_armor = [
    'c:armors/nautilus'
];

let spears_to_tag = [
    'vanillabackport_x_oreganized:silver_spear',
    'vanillabackport_x_oreganized:electrum_spear'
];
let nautilus_armor_to_tag = [
    'vanillabackport_x_oreganized:silver_nautilus_armor',
    'vanillabackport_x_oreganized:electru_nautilus_armor'
];

ServerEvents.tags('item', event => {
    // Add common tags to spears
    spears_to_tag.forEach(spear => {
        tags_for_spears.forEach(tag => {
            event.add(tag, spear);
        });
    });

    // Add common tags to nautilus armor
    nautilus_armor_to_tag.forEach(armor => {
        tags_for_nautilus_armor.forEach(tag => {
            event.add(tag, armor);
        });
    });

    event.add('oreganized:no_anvil_enchant_cost', 'vanillabackport_x_oreganized:silver_spear');
    event.add('oreganized:has_kinetic_damage', 'vanillabackport_x_oreganized:electrum_spear');
});

ServerEvents.recipes(event => {
    // Add smithing recipe for Electrum Spear
    event.smithing(
        'vanillabackport_x_oreganized:electrum_spear',
        'oreganized:electrum_upgrade_smithing_template',
        'minecraft:diamond_spear',
        'oreganized:electrum_ingot'
    );

    // Add smithing recipe for Electrum Nautilus Armor
    event.smithing(
        'vanillabackport_x_oreganized:electrum_nautilus_armor',
        'oreganized:electrum_upgrade_smithing_template',
        'minecraft:diamond_nautilus_armor',
        'oreganized:electrum_ingot'
    );
});