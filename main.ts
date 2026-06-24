namespace SpriteKind {
    export const Enemy_Projectile = SpriteKind.create()
    export const Shooting_enemy = SpriteKind.create()
    export const perigos = SpriteKind.create()
    export const flyingEnemy = SpriteKind.create()
    export const boss = SpriteKind.create()
    export const wave = SpriteKind.create()
    export const Clock = SpriteKind.create()
    export const Aura = SpriteKind.create()
}
/**
 * Boss Behavior
 */
/**
 * USE ESSAS FUNÇÕES
 */
/**
 * Dash
 */
/**
 * Pulo
 */
// Onda
function spawnBoss (x: number, y: number) {
    bossta = sprites.create(img`
        . . . . . . f f f f f . . . . . 
        . . . . f f f 3 1 1 f f . . . . 
        . . . f f 3 3 3 3 3 1 f f . . . 
        . . f f 3 f 3 3 3 3 3 3 f . . . 
        . . f 3 3 3 3 f 3 3 f 3 f f . . 
        . f f 3 3 3 f f 3 3 3 3 3 f . . 
        f f 3 f 3 f f 3 3 3 3 3 3 f . . 
        . f 3 f 3 3 3 3 3 3 3 3 3 f f f 
        . f 3 f f 3 3 3 3 3 f f 3 f . . 
        . f 3 3 f f f f f f f f 3 f . . 
        . f 3 3 3 3 f f f 3 3 3 3 f . . 
        . . f f 3 3 3 3 3 3 3 3 f f . . 
        . . . f f f f f f f f f f . . . 
        . . . f . . . . . . . . f . . . 
        . . . f . . . . . . . . f . . . 
        . f f f . . . . . . f f f . . . 
        `, SpriteKind.boss)
    bosstaHP = 100
    tiles.placeOnTile(bossta, tiles.getTileLocation(x, y))
    bossta.ay = 300
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.boss, function (sprite, otherSprite) {
    dealDamage()
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (prota.isHittingTile(CollisionDirection.Bottom)) {
        prota.vy = -175
        music.play(music.createSoundEffect(WaveShape.Square, 400, 600, 255, 255, 100, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.flyingEnemy, function (sprite4, otherSprite) {
    if (prota.vy > 0) {
        prota.setVelocity(0, -100)
        info.changeScoreBy(1)
        sprites.destroy(otherSprite)
        damagable = 0
        pause(50)
        damagable = 1
    } else if (prota.vy <= 0) {
        dealDamage()
        sprites.destroy(otherSprite)
    }
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (parryUsable == 1) {
        animation.runImageAnimation(
        prota,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . f f f f . . . . . . 
            . . . . . f 7 7 7 7 f . . . . . 
            . . . . f f 7 7 7 7 f f . . . . 
            . . . . f 7 f f f f f f . . . . 
            . . . . f f f 8 4 8 f . . . . . 
            . . . . . f 4 4 4 4 f . . . . . 
            . . . . . f b c c c c c a a . . 
            . . . . . f b c c c c c a a . . 
            . . . . a b c c a a a a 4 . . . 
            . . . . a a c 4 a 7 f . . . . . 
            . . . . . f 7 7 7 7 f . . . . . 
            . . . . . f 7 f f 7 f . . . . . 
            . . . . . . e e . e e . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . 5 . . . . . . . . . . 
            . . . . . . 5 5 5 5 . f f . . . 
            . . . . . 5 5 5 5 5 . f f f . . 
            . . . . . 5 5 8 4 8 f f 7 7 f . 
            . . . . a a 4 4 4 4 f f 7 7 f . 
            . . . . b a f f f f f 4 7 7 f . 
            . . . b c c 7 7 7 7 f 4 7 7 f . 
            . . . c a 4 7 7 7 7 f 7 f f . . 
            . . . c a f 7 7 7 7 f f f . . . 
            . . . c a f 7 7 7 7 f . . . . . 
            . . . a . f 7 f f 7 f . . . . . 
            . . . . . . e e . e e . . . . . 
            . . . . . . . . . . . . . . . . 
            `],
        100,
        false
        )
        parryState = 1
        parryUsable = 0
        pause(1000)
        parryState = 0
        animation.runImageAnimation(
        prota,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . . f f f f . . . . . . 
            . . . . . f 7 7 7 7 f . . . . . 
            . . . . f f 7 7 7 7 f f . . . . 
            . . . . f 7 f f f f f f . . . . 
            . . . . f f f 8 4 8 f . . . . . 
            . . . . . f 4 4 4 4 f . . . . . 
            . . . . . f b c c c c c a a . . 
            . . . . . f b c c c c c a a . . 
            . . . . a b c c a a a a 4 . . . 
            . . . . a a c 4 a 7 f . . . . . 
            . . . . . f 7 7 7 7 f . . . . . 
            . . . . . f 7 f f 7 f . . . . . 
            . . . . . . e e . e e . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . f f f f . . . . . . 
            . . . . . f 7 7 7 7 f . . . . . 
            . . . . f f 7 7 7 7 f f . . . . 
            . . . . f 7 f f f f f f . . . . 
            . . . . f f f 8 4 8 f . . . . . 
            . . . . . f 4 4 4 4 f . . . . . 
            . . . . . f b c c c c c a a . . 
            . . . . . f b c c c c c a a . . 
            . . . . a b c c a a a a 4 . . . 
            . . . . a a c 4 a 7 f . . . . . 
            . . . . . f 7 f f 7 f . . . . . 
            . . . . . . e e . e e . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `],
        500,
        true
        )
        pause(500)
        parryUsable = 1
    }
})
function getDistance (sprite1: Sprite, sprite2: Sprite) {
    return Math.sqrt(Math.abs(sprite1.x - sprite2.x) ** 2 + Math.abs(sprite1.y - sprite2.y) ** 2)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Clock, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    info.changeCountdownBy(30)
    game.splash("TEMPO ESTENDIDO!")
})
function spawnInimigo1 (x: number, y: number) {
    inimigo = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . 6 6 6 6 d . . . . . . . 
        . . . 6 d 6 6 6 6 . . . . . . . 
        . . 6 d 6 . . 6 6 . . . . . . . 
        . . 6 6 6 . . d 6 6 . . . . . . 
        . 2 . . . . . . d 6 6 . . . . . 
        . . . . . . . . . d 6 . . . . . 
        . . . . . . . . . d 6 . . . . . 
        . . . . . . . . . d 6 . . . . . 
        . . . . . . . . d 6 6 . . . . . 
        . . . . . . 6 6 6 6 . . . 6 . . 
        . . . . d 6 6 6 . . . 6 6 d . . 
        . . . d 6 6 6 6 6 6 6 6 6 d . . 
        . . . 6 6 6 6 6 6 6 6 d d . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy)
    animation.runImageAnimation(
    inimigo,
    [img`
        . . . . . . . . . . . . . . . . 
        . . . . 1 1 1 1 1 1 1 . . . . . 
        . . . 1 1 1 1 1 1 1 1 1 . . . . 
        . . 1 1 1 1 f f f 1 1 1 1 . . . 
        . . 1 1 1 f 1 1 1 f 1 1 1 . . . 
        . . 1 1 1 f 1 1 1 f 1 1 1 . . . 
        . . 1 1 1 f 1 1 1 f 1 1 1 . . . 
        . . 1 1 1 f 1 1 1 f 1 1 1 . . . 
        . . 1 1 1 f 1 1 1 f 1 1 1 . . . 
        . . 1 1 1 1 f f f 1 1 1 1 . . . 
        . . . 1 1 1 1 1 1 1 1 1 . . . . 
        . . 1 1 1 1 1 1 1 1 1 1 . . . . 
        . . 1 . 1 . . . . . 1 1 1 . . . 
        . 1 1 . . 1 . . . 1 . . 1 1 . . 
        . 1 . . . 1 . . . 1 . . . 1 . . 
        . . . . . . 1 . 1 . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . 1 1 1 1 1 1 1 . . . . . 
        . . . 1 1 1 1 1 1 1 1 1 . . . . 
        . . 1 1 1 1 f f f 1 1 1 1 . . . 
        . . 1 1 1 f 1 1 1 f 1 1 1 . . . 
        . . 1 1 1 f 1 1 1 f 1 1 1 . . . 
        . . 1 1 1 f 1 1 1 f 1 1 1 . . . 
        . . 1 1 1 f 1 1 1 f 1 1 1 . . . 
        . . 1 1 1 f 1 1 1 f 1 1 1 . . . 
        . . 1 1 1 1 f f f 1 1 1 1 . . . 
        . . . 1 1 1 1 1 1 1 1 1 . . . . 
        . . 1 1 1 1 1 1 1 1 1 1 1 . . . 
        . . 1 . . . 1 . 1 . . . 1 . . . 
        . . 1 1 . 1 . . . 1 . 1 1 . . . 
        . . . 1 . 1 . . . 1 . 1 . . . . 
        . . . . 1 . . . . . 1 . . . . . 
        `],
    200,
    true
    )
    inimigo.setVelocity(40, 0)
    tiles.placeOnTile(inimigo, tiles.getTileLocation(x, y))
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile15`, function (sprite, location) {
    tiles.setWallAt(tiles.getTileLocation(217, 21), false)
    tiles.setWallAt(tiles.getTileLocation(217, 20), false)
    tiles.setTileAt(location, assets.tile`baseTransparency16`)
    spawnFlying(228, 21)
    spawnFlying(237, 22)
    spawnFlying(252, 15)
    spawnFlying(235, 14)
    spawnClock(222, 4)
    tiles.setWallAt(tiles.getTileLocation(222, 3), true)
    tiles.setWallAt(tiles.getTileLocation(222, 4), true)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.wave, function (sprite, otherSprite) {
    dealDamage()
})
scene.onHitWall(SpriteKind.Enemy, function (sprite7, location3) {
    sprite7.setVelocity(-1 * sprite7.vx, 0)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (controller.down.isPressed()) {
        bala = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . f f f . . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . . f f f . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, prota, last_vx, 0)
        bala.y = prota.y + 3
    } else {
        bala = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . f f f . . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . . f f f . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, prota, last_vx, 0)
        bala.y = prota.y + 1
    }
    music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.UntilDone)
    pause(300)
})
sprites.onOverlap(SpriteKind.Shooting_enemy, SpriteKind.Projectile, function (sprite5, otherSprite2) {
    sprites.destroy(otherSprite2)
    sprites.destroy(sprite5)
    info.changeScoreBy(1)
    sprites.destroy(inimigo_atira)
})
sprites.onOverlap(SpriteKind.Aura, SpriteKind.flyingEnemy, function (sprite, otherSprite) {
    if (getDistance(prota, otherSprite) < 50) {
        otherSprite.follow(prota, 75)
    }
})
controller.down.onEvent(ControllerButtonEvent.Released, function () {
    if (last_vx > 0) {
        animation.runImageAnimation(
        prota,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . f f f f . . . . . . 
            . . . . . f 7 7 7 7 f . . . . . 
            . . . . f f 7 7 7 7 f f . . . . 
            . . . . f 7 f f f f f f . . . . 
            . . . . f f f 8 4 8 f . . . . . 
            . . . . . f 4 4 4 4 f . . . . . 
            . . . . . f b c c c c c a a . . 
            . . . . . f b c c c c c a a . . 
            . . . . a b c c a a a a 4 . . . 
            . . . . a a c 4 a 7 f . . . . . 
            . . . . . f 7 7 7 7 f . . . . . 
            . . . . . f 7 f f 7 f . . . . . 
            . . . . . . e e . e e . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . f f f f . . . . . . 
            . . . . . f 7 7 7 7 f . . . . . 
            . . . . f f 7 7 7 7 f f . . . . 
            . . . . f 7 f f f f f f . . . . 
            . . . . f f f 8 4 8 f . . . . . 
            . . . . . f 4 4 4 4 f . . . . . 
            . . . . . f b c c c c c a a . . 
            . . . . . f b c c c c c a a . . 
            . . . . a b c c a a a a 4 . . . 
            . . . . a a c 4 a 7 f . . . . . 
            . . . . . f 7 f f 7 f . . . . . 
            . . . . . . e e . e e . . . . . 
            . . . . . . . . . . . . . . . . 
            `],
        500,
        true
        )
    }
    if (last_vx < 0) {
        animation.runImageAnimation(
        prota,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . f f f f . . . . . . 
            . . . . . f 7 7 7 7 f . . . . . 
            . . . . f f 7 7 7 7 f f . . . . 
            . . . . f f f f f f 7 f . . . . 
            . . . . . f 8 4 8 f f f . . . . 
            . . . . . f 4 4 4 4 f . . . . . 
            . . a a c c c c c b f . . . . . 
            . . a a c c c c c b f . . . . . 
            . . . 4 a a a a c c b a . . . . 
            . . . . . f 7 a 4 c a a . . . . 
            . . . . . f 7 7 7 7 f . . . . . 
            . . . . . f 7 f f 7 f . . . . . 
            . . . . . e e . e e . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . f f f f . . . . . . 
            . . . . . f 7 7 7 7 f . . . . . 
            . . . . f f 7 7 7 7 f f . . . . 
            . . . . f f f f f f 7 f . . . . 
            . . . . . f 8 4 8 f f f . . . . 
            . . . . . f 4 4 4 4 f . . . . . 
            . . a a c c c c c b f . . . . . 
            . . a a c c c c c b f . . . . . 
            . . . 4 a a a a c c b a . . . . 
            . . . . . f 7 a 4 c a a . . . . 
            . . . . . f 7 f f 7 f . . . . . 
            . . . . . e e . e e . . . . . . 
            . . . . . . . . . . . . . . . . 
            `],
        500,
        true
        )
    }
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Projectile, function (sprite6, otherSprite3) {
    sprites.destroy(sprite6)
    sprites.destroy(otherSprite3)
    info.changeScoreBy(1)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile12`, function (sprite, location) {
    tiles.setWallAt(tiles.getTileLocation(111, 21), false)
    tiles.setWallAt(tiles.getTileLocation(111, 22), false)
    tiles.setTileAt(location, assets.tile`baseTransparency16`)
    spawnInimigo1(121, 29)
    spawnInimigo1(129, 29)
    spawnInimigoAtira(135, 29)
    spawnInimigoAtira(153, 26)
    spawnInimigoAtira(155, 21)
    spawnInimigoAtira(161, 23)
    spawnInimigoAtira(169, 28)
    spawnInimigoAtira(180, 20)
    spawnInimigoAtira(183, 19)
    spawnInimigoAtira(196, 27)
    spawnInimigoAtira(214, 23)
    spawnClock(217, 22)
    tiles.setWallAt(tiles.getTileLocation(217, 21), true)
    tiles.setWallAt(tiles.getTileLocation(217, 20), true)
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    prota,
    [img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . f f f f . . . . 
        . . . . . . . f 7 7 7 7 f . . . 
        . . . . . . f f 7 7 7 7 f f . . 
        . . . . . . f f f f f f 7 f . . 
        . . . . . . . f 8 4 8 f f f . . 
        . . . . . . . f 4 4 4 4 f . . . 
        . . . . a a c c c c c b f . . . 
        . . . . a a c c c c c b f . . . 
        . . . . . 4 a a a a c c b a . . 
        . . . . . . . f 7 a 4 c a a . . 
        . . . . . . . f 7 7 7 7 f . . . 
        . . . . . . . f 7 f f 7 f . . . 
        . . . . . . . e e . e e . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . f 7 7 7 7 f . . . . . 
        . . . . f f 7 7 7 7 f f . . . . 
        . . . . f f f f f f 7 f . . . . 
        . . . . . f 8 4 8 f f f . . . . 
        . . . . . f 4 4 4 4 f . . . . . 
        . . a a c c c c c b f . . . . . 
        . . a a c c c c c b f . . . . . 
        . . . 4 a a a a c c b a . . . . 
        . . . . e 7 7 a 4 c a a . . . . 
        . . . . . e f f 7 7 f . . . . . 
        . . . . . . . . f 7 f . . . . . 
        . . . . . . . . e e . . . . . . 
        . . . . . . . . . . . . . . . . 
        `],
    100,
    true
    )
})
controller.right.onEvent(ControllerButtonEvent.Released, function () {
    animation.runImageAnimation(
    prota,
    [img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . f 7 7 7 7 f . . . . . 
        . . . . f f 7 7 7 7 f f . . . . 
        . . . . f 7 f f f f f f . . . . 
        . . . . f f f 8 4 8 f . . . . . 
        . . . . . f 4 4 4 4 f . . . . . 
        . . . . . f b c c c c c a a . . 
        . . . . . f b c c c c c a a . . 
        . . . . a b c c a a a a 4 . . . 
        . . . . a a c 4 a 7 f . . . . . 
        . . . . . f 7 7 7 7 f . . . . . 
        . . . . . f 7 f f 7 f . . . . . 
        . . . . . . e e . e e . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . f 7 7 7 7 f . . . . . 
        . . . . f f 7 7 7 7 f f . . . . 
        . . . . f 7 f f f f f f . . . . 
        . . . . f f f 8 4 8 f . . . . . 
        . . . . . f 4 4 4 4 f . . . . . 
        . . . . . f b c c c c c a a . . 
        . . . . . f b c c c c c a a . . 
        . . . . a b c c a a a a 4 . . . 
        . . . . a a c 4 a 7 f . . . . . 
        . . . . . f 7 f f 7 f . . . . . 
        . . . . . . e e . e e . . . . . 
        . . . . . . . . . . . . . . . . 
        `],
    500,
    true
    )
})
controller.left.onEvent(ControllerButtonEvent.Released, function () {
    animation.runImageAnimation(
    prota,
    [img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . f f f f . . . . 
        . . . . . . . f 7 7 7 7 f . . . 
        . . . . . . f f 7 7 7 7 f f . . 
        . . . . . . f f f f f f 7 f . . 
        . . . . . . . f 8 4 8 f f f . . 
        . . . . . . . f 4 4 4 4 f . . . 
        . . . . a a c c c c c b f . . . 
        . . . . a a c c c c c b f . . . 
        . . . . . 4 a a a a c c b a . . 
        . . . . . . . f 7 a 4 c a a . . 
        . . . . . . . f 7 7 7 7 f . . . 
        . . . . . . . f 7 f f 7 f . . . 
        . . . . . . . e e . e e . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . f f f f . . . . 
        . . . . . . . f 7 7 7 7 f . . . 
        . . . . . . f f 7 7 7 7 f f . . 
        . . . . . . f f f f f f 7 f . . 
        . . . . . . . f 8 4 8 f f f . . 
        . . . . . . . f 4 4 4 4 f . . . 
        . . . . a a c c c c c b f . . . 
        . . . . a a c c c c c b f . . . 
        . . . . . 4 a a a a c c b a . . 
        . . . . . . . f 7 a 4 c a a . . 
        . . . . . . . f 7 f f 7 f . . . 
        . . . . . . . e e . e e . . . . 
        . . . . . . . . . . . . . . . . 
        `],
    500,
    true
    )
})
info.onCountdownEnd(function () {
    music.stopAllSounds()
    game.gameOver(false)
    game.setGameOverScoringType(game.ScoringType.HighScore)
    music.play(music.melodyPlayable(music.bigCrash), music.PlaybackMode.UntilDone)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Shooting_enemy, function (sprite4, otherSprite) {
    if (prota.vy > 0) {
        prota.setVelocity(0, -100)
        info.changeScoreBy(1)
        sprites.destroy(otherSprite)
        damagable = 0
        pause(50)
        damagable = 1
    } else if (prota.vy <= 0) {
        dealDamage()
        sprites.destroy(otherSprite)
    }
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    prota,
    [img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . f f f f . . . . . 
        . . . . . . f 7 7 7 7 f . . . . 
        . . . . . f f 7 7 7 7 f f . . . 
        . . . . . f 7 f f f f f f . . . 
        . . . . . f f f 8 4 8 f . . . . 
        . . . . . . f 4 4 4 4 f . . . . 
        . . . . . . f b c c c c c a a . 
        . . . . . . f b c c c c c a a . 
        . . . . . a b c c a a a a 4 . . 
        . . . . . a a c 4 a 7 f . . . . 
        . . . . . . f 7 7 7 7 f . . . . 
        . . . . . . f 7 f f 7 f . . . . 
        . . . . . . . e e . e e . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . f 7 7 7 7 f . . . . . 
        . . . . f f 7 7 7 7 f f . . . . 
        . . . . f 7 f f f f f f . . . . 
        . . . . f f f 8 4 8 f . . . . . 
        . . . . . f 4 4 4 4 f . . . . . 
        . . . . . f b c c c c c a a . . 
        . . . . . f b c c c c c a a . . 
        . . . . a b c c a a a a 4 . . . 
        . . . . a a c 4 a 7 7 e . . . . 
        . . . . . f 7 7 f f e . . . . . 
        . . . . . f 7 f . . . . . . . . 
        . . . . . . e e . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `],
    100,
    true
    )
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile17`, function (sprite, location) {
    music.stopAllSounds()
    music.play(music.melodyPlayable(music.beamUp), music.PlaybackMode.UntilDone)
    music.play(music.stringPlayable("G B A G C5 B A B ", 200), music.PlaybackMode.UntilDone)
    game.splash("Parabéns soldado!")
    game.splash("Você trouxe democracia para esse planeta!")
    game.splash("E consegui petróleo em troca!")
    game.splash("Nosso país te agradece imensamente")
    game.gameOver(true)
    game.setGameOverEffect(true, effects.confetti)
    game.setGameOverMessage(true, "WELL DONE!")
    game.setGameOverScoringType(game.ScoringType.HighScore)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.flyingEnemy, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    sprites.destroy(otherSprite)
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.hazardLava1, function (sprite8, location4) {
    info.setLife(0)
    music.stopAllSounds()
    music.play(music.melodyPlayable(music.bigCrash), music.PlaybackMode.UntilDone)
})
function spawnInimigoAtira (x: number, y: number) {
    inimigo_atira = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . 6 6 6 6 d . . . . . . . 
        . . . 6 d 6 6 6 6 . . . . . . . 
        . . 6 d 6 . . 6 6 . . . . . . . 
        . . 6 6 6 . . d 6 6 . . . . . . 
        . 2 . . . . . . d 6 6 . . . . . 
        . . . . . . . . . d 6 . . . . . 
        . . . . . . . . . d 6 . . . . . 
        . . . . . . . . . d 6 . . . . . 
        . . . . . . . . d 6 6 . . . . . 
        . . . . . . 6 6 6 6 . . . 6 . . 
        . . . . d 6 6 6 . . . 6 6 d . . 
        . . . d 6 6 6 6 6 6 6 6 6 d . . 
        . . . 6 6 6 6 6 6 6 6 d d . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Shooting_enemy)
    animation.runImageAnimation(
    inimigo_atira,
    [img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . 6 6 6 6 d . . . . . . . 
        . . . 6 d 6 6 6 6 . . . . . . . 
        . . 6 d 6 . . 6 6 . . . . . . . 
        . . 6 6 6 . . d 6 6 . . . . . . 
        . 2 . . . . . . d 6 6 . . . . . 
        . . . . . . . . . d 6 . . . . . 
        . . . . . . . . . d 6 . . . . . 
        . . . . . . . . . d 6 . . . . . 
        . . . . . . . . d 6 6 . . . . . 
        . . . . . . 6 6 6 6 . . . 6 . . 
        . . . . d 6 6 6 . . . 6 6 d . . 
        . . . d 6 6 6 6 6 6 6 6 6 d . . 
        . . . 6 6 6 6 6 6 6 6 d d . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . 6 6 6 6 d . . . . . . . 
        . . . 6 d 6 6 6 6 . . . . . . . 
        . . 6 d 6 . . 6 6 . . . . . . . 
        . . 6 6 6 . . d 6 6 . . . . . . 
        . 2 . . . . . . d 6 6 . . . . . 
        . . . . . . . . . d 6 . . . . . 
        . . . . . . . . d d 6 . . . . . 
        . . . . . . 6 6 6 6 . . . 6 . . 
        . . . . d 6 6 6 . . . 6 6 d . . 
        . . . d 6 6 6 6 6 6 6 6 6 d . . 
        . . . . . . . . . . . . . . . . 
        `],
    500,
    true
    )
    tiles.placeOnTile(inimigo_atira, tiles.getTileLocation(x, y))
}
sprites.onDestroyed(SpriteKind.boss, function (sprite) {
    tiles.setTileAt(tiles.getTileLocation(223, 10), assets.tile`myTile16`)
    tiles.setTileAt(tiles.getTileLocation(224, 10), assets.tile`myTile14`)
    tiles.setTileAt(tiles.getTileLocation(229, 10), assets.tile`myTile16`)
    tiles.setTileAt(tiles.getTileLocation(230, 10), assets.tile`myTile14`)
    tiles.setTileAt(tiles.getTileLocation(235, 10), assets.tile`myTile16`)
    tiles.setTileAt(tiles.getTileLocation(240, 10), assets.tile`myTile14`)
    tiles.setTileAt(tiles.getTileLocation(245, 10), assets.tile`myTile16`)
    tiles.setTileAt(tiles.getTileLocation(253, 10), assets.tile`myTile14`)
    tiles.setTileAt(tiles.getTileLocation(252, 10), assets.tile`myTile16`)
    tiles.setTileAt(tiles.getTileLocation(237, 10), assets.tile`myTile17`)
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (last_vx < 0) {
        animation.runImageAnimation(
        prota,
        assets.animation`agachado2`,
        100,
        false
        )
    }
    if (last_vx > 0) {
        animation.runImageAnimation(
        prota,
        assets.animation`agachado0`,
        100,
        false
        )
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile2`, function (sprite, location) {
    spawnBoss(252, 10)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile11`, function (sprite8, location4) {
    info.setLife(0)
    music.stopAllSounds()
    music.play(music.melodyPlayable(music.bigCrash), music.PlaybackMode.UntilDone)
})
function dealDamage () {
    if (damagable == 1) {
        if (parryState == 0) {
            music.play(music.melodyPlayable(music.thump), music.PlaybackMode.UntilDone)
            damagable = 0
            info.changeLifeBy(-1)
            pause(500)
            damagable = 1
        } else {
            music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
        }
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite4, otherSprite) {
    if (prota.vy > 0) {
        prota.setVelocity(0, -100)
        info.changeScoreBy(1)
        sprites.destroy(otherSprite)
        damagable = 0
        pause(50)
        damagable = 1
    } else if (prota.vy <= 0) {
        dealDamage()
        sprites.destroy(otherSprite)
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.boss, function (sprite, otherSprite) {
    if (bossDamagable == 1) {
        info.changeScoreBy(1)
        bosstaHP += -1
    }
    sprites.destroy(sprite)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.flyingEnemy, function (sprite, otherSprite) {
    dealDamage()
    sprites.destroy(otherSprite)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile4`, function (sprite8, location4) {
    info.setLife(0)
    music.stopAllSounds()
    music.play(music.melodyPlayable(music.bigCrash), music.PlaybackMode.UntilDone)
})
function spawnFlying (x: number, y: number) {
    flying = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 6 6 . . . . . . . 
        . . . . . . 6 6 9 6 . . . . . . 
        . . . 6 6 6 9 9 9 9 6 6 6 . . . 
        . . 6 9 9 8 8 8 8 9 9 9 9 6 . . 
        . . 6 9 8 8 8 8 8 8 9 9 9 6 . . 
        . 6 9 8 8 6 8 8 8 8 9 9 9 9 6 . 
        . 6 8 8 6 2 6 8 8 8 9 9 9 9 6 . 
        . 6 8 8 6 2 6 8 8 8 9 9 9 9 6 . 
        . . 6 8 8 6 8 8 8 8 9 9 9 6 . . 
        . . . 6 8 8 8 8 8 9 9 9 6 . . . 
        . . . 6 9 8 8 8 9 9 9 9 6 . . . 
        . . . . 6 6 6 6 6 6 6 6 . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.flyingEnemy)
    tiles.placeOnTile(flying, tiles.getTileLocation(x, y))
}
scene.onHitWall(SpriteKind.Enemy_Projectile, function (sprite3, location2) {
    sprites.destroy(bala_inimiga)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy_Projectile, function (sprite9, otherSprite4) {
    sprites.destroy(otherSprite4)
    dealDamage()
})
// Fraco
sprites.onCreated(SpriteKind.boss, function (sprite) {
    sprite.setBounceOnWall(true)
    sprite.setScale(3, ScaleAnchor.Middle)
    while (bosstaHP > 0) {
        for (let index = 0; index < 2; index++) {
            sprite.setVelocity(50, 0)
            pause(2000)
            sprite.setVelocity(-50, 0)
            pause(5000)
            sprite.setVelocity(50, 50)
            pause(1000)
            sprite.setVelocity(0, 50)
            pause(1000)
            sprite.setVelocity(-50, 50)
            pause(1000)
            sprite.setVelocity(0, 50)
        }
        pause(5000)
        sprite.setImage(img`
            . . . . . . f f f f f . . . . . 
            . . . . f f f 6 1 1 f f . . . . 
            . . . f f 6 6 6 6 6 1 f f . . . 
            . . f f 6 f 6 6 6 6 6 6 f . . . 
            . . f 6 6 6 6 f 6 6 f 6 f f . . 
            . f f 6 6 6 f f 6 6 6 6 6 f . . 
            f f 6 6 6 f f 6 6 6 6 6 6 f . . 
            . f 6 6 6 6 6 6 6 6 6 6 6 f f f 
            . f 6 f f f f f f f f 6 6 f . . 
            . f 8 6 6 6 6 6 6 6 f f 6 f . . 
            . f 8 8 6 6 6 6 6 6 6 f 6 f . . 
            . . f f 8 8 8 8 6 6 6 6 f f . . 
            . . . f f f f f f f f f f . . . 
            . . . f . . . . . . . . f . . . 
            . . . f . . . . . . . . f . . . 
            . f f f . . . . . . f f f . . . 
            `)
        bossDamagable = 1
        pause(5000)
        bossDamagable = 0
        sprite.setImage(img`
            . . . . . . f f f f f . . . . . 
            . . . . f f f 3 1 1 f f . . . . 
            . . . f f 3 3 3 3 3 1 f f . . . 
            . . f f 3 f 3 3 3 3 3 3 f . . . 
            . . f 3 3 3 3 f 3 3 f 3 f f . . 
            . f f 3 3 3 f f 3 3 3 3 3 f . . 
            f f 3 f 3 f f 3 3 3 3 3 3 f . . 
            . f 3 f 3 3 3 3 3 3 3 3 3 f f f 
            . f 3 f f 3 3 3 3 3 f f 3 f . . 
            . f 3 3 f f f f f f f f 3 f . . 
            . f 3 3 3 3 f f f 3 3 3 3 f . . 
            . . f f 3 3 3 3 3 3 3 3 f f . . 
            . . . f f f f f f f f f f . . . 
            . . . f . . . . . . . . f . . . 
            . . . f . . . . . . . . f . . . 
            . f f f . . . . . . f f f . . . 
            `)
        pause(1000)
        waveprojectile = sprites.create(img`
            . . . . . . . 8 8 . . . . . . . 
            . . . . . . . 8 8 . . . . . . . 
            . . . . . . . 8 8 . . . . . . . 
            . . . . . . . 8 8 . . . . . . . 
            . . . . . . . 8 8 . . . . . . . 
            . . . . . . . 8 8 . . . . . . . 
            . . . . . . . 8 8 . . . . . . . 
            . . . . . . . 8 8 . . . . . . . 
            . . . . . . . 8 8 . . . . . . . 
            . . . . . . . 8 8 . . . . . . . 
            . . . . . . . 8 8 . . . . . . . 
            . . . . . . . 8 8 . . . . . . . 
            . . . . . . . 8 8 . . . . . . . 
            . . . . . . . 8 8 . . . . . . . 
            . . . . . . . 8 8 . . . . . . . 
            . . . . . . . 8 8 . . . . . . . 
            `, SpriteKind.wave)
        waveprojectile.setPosition(sprite.x, sprite.y)
        waveprojectile.setScale(4, ScaleAnchor.Middle)
        if (prota.x < sprite.x) {
            waveprojectile.setVelocity(-50, 0)
        } else {
            waveprojectile.setVelocity(50, 0)
        }
    }
    sprites.destroy(sprite, effects.spray, 5000)
})
function spawnClock (x: number, y: number) {
    Watch = sprites.create(img`
        . . . . . . . . . 5 5 . . . . . 
        . . . . . . . . 5 . . 5 5 . . . 
        . . . . . . . 5 . . . . . 5 . . 
        . . . . . 5 5 5 5 5 5 . . . 5 5 
        . . . . 5 1 1 1 1 1 1 5 . . . . 
        . . . 5 1 1 1 f 1 1 1 1 5 . . . 
        . . 5 1 1 1 1 f 1 1 1 1 1 5 . . 
        . . 5 1 1 1 1 f 1 1 f 1 1 5 . . 
        . . 5 1 1 1 1 f 1 f 1 1 1 5 . . 
        . . 5 1 1 1 1 f f 1 1 1 1 5 . . 
        . . 5 1 1 1 1 1 1 1 1 1 1 5 . . 
        . . 5 1 1 1 1 1 1 1 1 1 1 5 . . 
        . . . 5 1 1 1 1 1 1 1 1 5 . . . 
        . . . . 5 1 1 1 1 1 1 5 . . . . 
        . . . . . 5 5 5 5 5 5 . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Clock)
    tiles.placeOnTile(Watch, tiles.getTileLocation(x, y))
}
let lastY = 0
let lastLastY = 0
let Watch: Sprite = null
let waveprojectile: Sprite = null
let bala_inimiga: Sprite = null
let flying: Sprite = null
let bossDamagable = 0
let inimigo_atira: Sprite = null
let bala: Sprite = null
let parryState = 0
let bosstaHP = 0
let bossta: Sprite = null
let last_vx = 0
let parryUsable = 0
let damagable = 0
let prota: Sprite = null
let inimigo: Sprite = null
scene.setBackgroundImage(img`
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    `)
effects.starField.startScreenEffect()
tiles.setCurrentTilemap(tilemap`level9`)
spawnInimigo1(11, 31)
spawnInimigo1(36, 30)
spawnInimigo1(45, 30)
spawnInimigo1(82, 27)
spawnInimigo1(90, 27)
spawnInimigo1(103, 27)
game.showLongText("Soldado!", DialogLayout.Bottom)
game.showLongText("Esse planeta precisa de democracia!", DialogLayout.Bottom)
game.showLongText("Use as setas para se mover", DialogLayout.Bottom)
game.showLongText("Mate os inimigos para ganhar pontos", DialogLayout.Bottom)
game.showLongText("Passe pelas bandeiras para avançar", DialogLayout.Bottom)
game.showLongText("\"Dialogue\" com o líder do planeta para vencer!", DialogLayout.Bottom)
info.setScore(0)
info.setLife(5)
info.startCountdown(50)
music.play(music.stringPlayable("D C D E D D E D ", 400), music.PlaybackMode.LoopingInBackground)
parryUsable = 1
damagable = 1
prota = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . 3 3 3 3 3 3 . . . . . 
    . . . . . 3 3 3 3 3 3 . . . . . 
    . . . . . 3 3 3 3 3 3 . . . . . 
    . . . . . 3 3 3 3 3 3 . . . . . 
    . . . . . 3 3 3 3 3 3 . . . . . 
    . . . . . 3 3 3 3 3 3 . . . . . 
    . . . . . 3 3 3 3 3 3 . . . . . 
    . . . . . 3 3 3 3 3 3 . . . . . 
    . . . . . 3 3 3 3 3 3 . . . . . 
    . . . . . 3 3 3 3 3 3 . . . . . 
    . . . . . 3 3 3 3 3 3 . . . . . 
    `, SpriteKind.Player)
animation.runImageAnimation(
prota,
[img`
    . . . . . . . . . . . . . . . . 
    . . . . . . f f f f . . . . . . 
    . . . . . f 7 7 7 7 f . . . . . 
    . . . . f f 7 7 7 7 f f . . . . 
    . . . . f 7 f f f f f f . . . . 
    . . . . f f f 8 4 8 f . . . . . 
    . . . . . f 4 4 4 4 f . . . . . 
    . . . . . f b c c c c c a a . . 
    . . . . . f b c c c c c a a . . 
    . . . . a b c c a a a a 4 . . . 
    . . . . a a c 4 a 7 f . . . . . 
    . . . . . f 7 7 7 7 f . . . . . 
    . . . . . f 7 f f 7 f . . . . . 
    . . . . . . e e . e e . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `,img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . f f f f . . . . . . 
    . . . . . f 7 7 7 7 f . . . . . 
    . . . . f f 7 7 7 7 f f . . . . 
    . . . . f 7 f f f f f f . . . . 
    . . . . f f f 8 4 8 f . . . . . 
    . . . . . f 4 4 4 4 f . . . . . 
    . . . . . f b c c c c c a a . . 
    . . . . . f b c c c c c a a . . 
    . . . . a b c c a a a a 4 . . . 
    . . . . a a c 4 a 7 f . . . . . 
    . . . . . f 7 f f 7 f . . . . . 
    . . . . . . e e . e e . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `],
500,
true
)
tiles.placeOnTile(prota, tiles.getTileLocation(1, 25))
scene.cameraFollowSprite(prota)
controller.moveSprite(prota, 100, 0)
prota.ay = 300
last_vx = 50
let aurafarmed = sprites.create(img`
    6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
    6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
    6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
    6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
    6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
    6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
    6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
    6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
    6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
    6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
    6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
    6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
    6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
    6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
    6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
    6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
    `, SpriteKind.Aura)
aurafarmed.follow(prota, 500)
aurafarmed.setFlag(SpriteFlag.GhostThroughWalls, true)
aurafarmed.setScale(6, ScaleAnchor.Middle)
aurafarmed.setFlag(SpriteFlag.Invisible, true)
aurafarmed.setFlag(SpriteFlag.GhostThroughTiles, true)
spawnClock(111, 23)
tiles.setWallAt(tiles.getTileLocation(111, 22), true)
tiles.setWallAt(tiles.getTileLocation(111, 21), true)
game.onUpdate(function () {
    if (prota.vx != 0) {
        last_vx = prota.vx * 1.5
    }
})
game.onUpdate(function () {
    for (let bala_inimiga of sprites.allOfKind(SpriteKind.Enemy_Projectile)) {
        if (bala_inimiga.isHittingTile(CollisionDirection.Left)) {
            sprites.destroy(bala_inimiga)
        }
        if (bala_inimiga.isHittingTile(CollisionDirection.Right)) {
            sprites.destroy(bala_inimiga)
        }
    }
})
game.onUpdate(function () {
    for (let flying of sprites.allOfKind(SpriteKind.flyingEnemy)) {
        while (flying.vx != 0) {
            if (flying.vx < 0) {
                flying.setImage(img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . 6 6 . . . . . . . 
                    . . . . . . 6 6 9 6 . . . . . . 
                    . . . 6 6 6 9 9 9 9 6 6 6 . . . 
                    . . 6 9 9 8 8 8 8 9 9 9 9 6 . . 
                    . . 6 9 8 8 8 8 8 8 9 9 9 6 . . 
                    . 6 9 8 8 6 8 8 8 8 9 9 9 9 6 . 
                    . 6 8 8 6 2 6 8 8 8 9 9 9 9 6 . 
                    . 6 8 8 6 2 6 8 8 8 9 9 9 9 6 . 
                    . . 6 8 8 6 8 8 8 8 9 9 9 6 . . 
                    . . . 6 8 8 8 8 8 9 9 9 6 . . . 
                    . . . 6 9 8 8 8 9 9 9 9 6 . . . 
                    . . . . 6 6 6 6 6 6 6 6 . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `)
            } else {
                flying.setImage(img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . 6 6 . . . . . . . 
                    . . . . . . 6 9 6 6 . . . . . . 
                    . . . 6 6 6 9 9 9 9 6 6 6 . . . 
                    . . 6 9 9 9 9 8 8 8 8 9 9 6 . . 
                    . . 6 9 9 9 8 8 8 8 8 8 9 6 . . 
                    . 6 9 9 9 9 8 8 8 8 6 8 8 9 6 . 
                    . 6 9 9 9 9 8 8 8 6 2 6 8 8 6 . 
                    . 6 9 9 9 9 8 8 8 6 2 6 8 8 6 . 
                    . . 6 9 9 9 8 8 8 8 6 8 8 6 . . 
                    . . . 6 9 9 9 8 8 8 8 8 6 . . . 
                    . . . 6 9 9 9 9 8 8 8 9 6 . . . 
                    . . . . 6 6 6 6 6 6 6 6 . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `)
            }
        }
    }
})
game.onUpdate(function () {
    for (let inimigo_atira of sprites.allOfKind(SpriteKind.Shooting_enemy)) {
        if (prota.x < inimigo_atira.x) {
            inimigo_atira.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . 6 6 6 6 d . . . . . . . 
                . . . 6 d 6 6 6 6 . . . . . . . 
                . . 6 d 6 . . 6 6 . . . . . . . 
                . . 6 6 6 . . d 6 6 . . . . . . 
                . 2 . . . . . . d 6 6 . . . . . 
                . . . . . . . . . d 6 . . . . . 
                . . . . . . . . . d 6 . . . . . 
                . . . . . . . . . d 6 . . . . . 
                . . . . . . . . d 6 6 . . . . . 
                . . . . . . 6 6 6 6 . . . 6 . . 
                . . . . d 6 6 6 . . . 6 6 d . . 
                . . . d 6 6 6 6 6 6 6 6 6 d . . 
                . . . 6 6 6 6 6 6 6 6 d d . . . 
                . . . . . . . . . . . . . . . . 
                `)
        } else {
            inimigo_atira.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . d 6 6 6 6 . . . . 
                . . . . . . . 6 6 6 6 d 6 . . . 
                . . . . . . . 6 6 . . 6 d 6 . . 
                . . . . . . 6 6 d . . 6 6 6 . . 
                . . . . . 6 6 d . . . . . . 2 . 
                . . . . . 6 d . . . . . . . . . 
                . . . . . 6 d . . . . . . . . . 
                . . . . . 6 d . . . . . . . . . 
                . . . . . 6 6 d . . . . . . . . 
                . . 6 . . . 6 6 6 6 . . . . . . 
                . . d 6 6 . . . 6 6 6 d . . . . 
                . . d 6 6 6 6 6 6 6 6 6 d . . . 
                . . . d d 6 6 6 6 6 6 6 6 . . . 
                . . . . . . . . . . . . . . . . 
                `)
        }
    }
})
game.onUpdateInterval(50, function () {
    lastLastY = lastY
    lastY = prota.y
})
game.onUpdateInterval(2000, function () {
    for (let inimigo_atira2 of sprites.allOfKind(SpriteKind.Shooting_enemy)) {
        if (prota.x > inimigo_atira2.x) {
            bala_inimiga = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . 2 . . . . . . . . 
                . . . . . . 2 2 2 . . . . . . . 
                . . . . . 2 2 2 2 2 . . . . . . 
                . . . . . . 2 2 2 . . . . . . . 
                . . . . . . . 2 . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, SpriteKind.Enemy_Projectile)
            bala_inimiga.vx = 100
            bala_inimiga.setPosition(inimigo_atira2.x, inimigo_atira2.y - 5)
        } else {
            bala_inimiga = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . 2 . . . . . . . . 
                . . . . . . 2 2 2 . . . . . . . 
                . . . . . 2 2 2 2 2 . . . . . . 
                . . . . . . 2 2 2 . . . . . . . 
                . . . . . . . 2 . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, SpriteKind.Enemy_Projectile)
            bala_inimiga.vx = -100
            bala_inimiga.setPosition(inimigo_atira2.x, inimigo_atira2.y - 5)
        }
    }
})
