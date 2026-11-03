let $Item$Properties = Java.loadClass('net.minecraft.world.item.Item$Properties');
// Load Vanilla Backport item classes for spear & nautilus armor items
let $SpearItem = Java.loadClass('com.blackgear.vanillabackport.common.level.items.spear.SpearItem');
let $NautilusArmorItem = Java.loadClass('com.blackgear.vanillabackport.common.level.items.NautilusArmorItem');
// Load tier and material for Oreganized items
let $ArgentumItems = Java.loadClass('galena.oreganized.argentum.index.ArgentumItems');
let $ElectrumItems = Java.loadClass('galena.oreganized.electrum.index.ElectrumItems');

StartupEvents.registry('item', event => {
    // Create Silver Spear
    let SILVER_SPEAR = event.createCustom('vanillabackport_x_oreganized:silver_spear', () => new $SpearItem(
        $ArgentumItems.SILVER_TIER,
        0.95,
        0.7,
        0.7,
        3.5,
        10.0,
        8.5,
        5.1,
        13.75,
        4.6,
        new $Item$Properties()
    ));

    // Create Electrum Spear
    let ELECTRUM_SPEAR = event.createCustom('vanillabackport_x_oreganized:electrum_spear', () => new $SpearItem(
        $ElectrumItems.ELECTRUM_TIER,
        1.05,
        1.075,
        0.5,
        3.0,
        7.5,
        6.5,
        5.1,
        10.0,
        4.6,
        new $Item$Properties()
    ));

    // Create Silver Nautilus Armor
    let SILVER_NAUTILUS_ARMOR = event.createCustom('vanillabackport_x_oreganized:silver_nautilus_armor', () => new $NautilusArmorItem(
        $ArgentumItems.SILVER_MATERIAL, new $Item$Properties().stacksTo(1)
    ));


    // Create Electrum Nautilus Armor
    let ELECTRUM_NAUTILUS_ARMOR = event.createCustom('vanillabackport_x_oreganized:electrum_nautilus_armor', () => new $NautilusArmorItem(
        $ElectrumItems.ELECTRUM_MATERIAL, new $Item$Properties().stacksTo(1)
    ));
});

StartupEvents.modifyCreativeTab('minecraft:combat', event => {
    // Add items to appropriate places in the Creative inventory
    event.addAfter('minecraft:iron_spear', 'vanillabackport_x_oreganized:silver_spear');
    event.addAfter('minecraft:diamond_spear', 'vanillabackport_x_oreganized:electrum_spear');
    event.addAfter('minecraft:iron_nautilus_armor', 'vanillabackport_x_oreganized:silver_nautilus_armor');
    event.addAfter('minecraft:diamond_nautilus_armor', 'vanillabackport_x_oreganized:electrum_nautilus_armor');
});

ItemEvents.modification(event => {
    // Correct attributes of Electrum Spear
    event.modify('vanillabackport_x_oreganized:electrum_spear', item => {
        let modifiedAttributeModifier = Item.of(item.item().id).attributeModifiers
            .withModifierAdded(
                "oreganized:kinetic_damage",
                {
                    amount: 2,
                    id: "oreganized:kinetic_damage",
                    operation: "add_value"
                },
                "mainhand"
            );
        item.setAttributeModifiersWithTooltip(modifiedAttributeModifier.modifiers());
    });

    // Correct attributes of Silver Nautilus Armor
    event.modify('vanillabackport_x_oreganized:silver_nautilus_armor', item => {
        let modifiedAttributeModifier = Item.of(item.item().id).attributeModifiers
            .withModifierAdded(
                "minecraft:generic.armor",
                {
                    amount: 5,
                    id: "minecraft:armor",
                    operation: "add_value"
                },
                "body"
            )
            .withModifierAdded(
                "oreganized:invincibility_frames",
                {
                    amount: 0.2,
                    id: "oreganized:invincibility_frames",
                    operation: "add_value"
                },
                "body"
            );
        item.setAttributeModifiersWithTooltip(modifiedAttributeModifier.modifiers());
    });

    // Correct attributes of Electrum Nautilus Armor
    event.modify('vanillabackport_x_oreganized:electrum_nautilus_armor', item => {
        let modifiedAttributeModifier = Item.of(item.item().id).attributeModifiers
            .withModifierAdded(
                "minecraft:generic.armor",
                {
                    amount: 11,
                    id: "minecraft:armor",
                    operation: "add_value"
                },
                "body"
            )
            .withModifierAdded(
                "minecraft:generic.movement_speed",
                {
                    amount: 0.05,
                    id: "minecraft:movement_speed",
                    operation: "add_multiplied_base"
                },
                "body"
            );
        item.setAttributeModifiersWithTooltip(modifiedAttributeModifier.modifiers());
    });
});