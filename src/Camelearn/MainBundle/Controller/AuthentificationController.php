<?php

namespace Camelearn\MainBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class AuthentificationController extends Controller
{
    public function loginAction()
    {
        return $this->render('CamelearnMainBundle:Authentification:login.html.twig');
    }
}
